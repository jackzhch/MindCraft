import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { Resend } from 'resend';

// Get environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const resendApiKey = process.env.RESEND_API_KEY || '';

// Initialize Resend client
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Lazy-initialize Stripe client to avoid module-level crashes
let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance && stripeSecretKey) {
    stripeInstance = new Stripe(stripeSecretKey, {
      apiVersion: '2025-12-15.clover',
    });
  }
  if (!stripeInstance) {
    throw new Error('Stripe is not initialized');
  }
  return stripeInstance;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// Email Service Functions
interface SendPurchaseConfirmationParams {
  customerEmail: string;
  customerName?: string;
  items?: string;
}

async function sendPurchaseConfirmation(params: SendPurchaseConfirmationParams): Promise<void> {
  const { customerEmail, customerName, items } = params;

  console.log('📧 sendPurchaseConfirmation called for:', customerEmail);
  console.log('📧 Has Resend client:', !!resend);

  if (!resend) {
    const errorMsg = 'RESEND_API_KEY is not configured. Email will not be sent.';
    console.error('❌', errorMsg);
    throw new Error('Email service not configured');
  }

  try {
    console.log('📧 Sending email via Resend...');
    const result = await resend.emails.send({
      from: 'MindCraft <onboarding@resend.dev>',
      to: customerEmail,
      subject: 'Purchase Confirmation from MindCraft',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Purchase Confirmation</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">MindCraft</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0;">Digital Architectures for Thought</p>
            </div>
            
            <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
              ${customerName ? `<p style="font-size: 16px;">Hi ${customerName},</p>` : ''}
              
              <h2 style="color: #667eea; margin-top: 0;">Thank You for Your Purchase! 🎉</h2>
              
              <p style="font-size: 16px; line-height: 1.8;">
                Here is your product, thank you for purchasing!
              </p>

              ${items ? `
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #333; font-size: 18px;">Your Order:</h3>
                <p style="margin: 0; color: #666;">${items}</p>
              </div>
              ` : ''}

              <div style="margin-top: 30px; padding: 20px; background: #f0f4ff; border-left: 4px solid #667eea; border-radius: 4px;">
                <p style="margin: 0; color: #333;">
                  <strong>Next Steps:</strong><br>
                  Your digital products are now accessible. Check your account dashboard or download links sent separately.
                </p>
              </div>

              <p style="margin-top: 30px; color: #666;">
                If you have any questions or need assistance, feel free to reach out to our support team.
              </p>

              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0; text-align: center; color: #999; font-size: 14px;">
                <p style="margin: 5px 0;">© 2026 MindCraft. All rights reserved.</p>
                <p style="margin: 5px 0;">Digital Architectures for Thought</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ Email sent successfully to:', customerEmail);
    console.log('✅ Resend result:', JSON.stringify(result));
  } catch (error: any) {
    console.error('❌ Failed to send purchase confirmation email');
    console.error('❌ Error message:', error.message);
    console.error('❌ Error details:', error);
    throw error;
  }
}

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('🔔 Webhook endpoint called');
    console.log('Method:', req.method);
    
    // Check environment variables first
    console.log('📝 Environment variables status:');
    console.log('  STRIPE_SECRET_KEY:', stripeSecretKey ? '✅ Set' : '❌ Missing');
    console.log('  STRIPE_WEBHOOK_SECRET:', webhookSecret ? '✅ Set' : '❌ Missing');
    console.log('  RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing');
    
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        error: 'Method not allowed',
        message: 'This endpoint only accepts POST requests from Stripe',
        method: req.method 
      });
    }

    if (!stripeSecretKey) {
      console.error('❌ STRIPE_SECRET_KEY is not configured');
      return res.status(500).json({ error: 'Stripe secret key not configured' });
    }

    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET is not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    if (!sig) {
      console.error('❌ Missing stripe-signature header');
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    console.log('🔐 Verifying webhook signature...');
    let event: Stripe.Event;

    try {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log('✅ Webhook signature verified');
    } catch (err: any) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    // Handle the event
    console.log('📦 Processing event type:', event.type);
    
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('💳 Payment successful:', session.id);
        
        const metadata = session.metadata;
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name;
        
        console.log('👤 Customer:', customerEmail);
        console.log('🛒 Items:', metadata?.items);
        
        // Send purchase confirmation email
        if (customerEmail) {
          try {
            console.log('📧 Attempting to send confirmation email...');
            await sendPurchaseConfirmation({
              customerEmail,
              customerName: customerName || undefined,
              items: metadata?.items,
            });
            console.log('✅ Order fulfillment completed for:', customerEmail);
          } catch (error: any) {
            console.error('❌ Failed to send confirmation email:', error);
            console.error('❌ Email error details:', error.message, error.stack);
            // Log error but don't fail the webhook
            // Stripe should still receive a 200 OK
          }
        } else {
          console.error('⚠️ No customer email found in session');
        }
        
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('Payment failed:', paymentIntent.id);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    console.log('✅ Webhook processed successfully, returning 200');
    return res.status(200).json({ received: true });
  } catch (error: any) {
    // Catch any unhandled errors to prevent 500 responses
    console.error('❌❌❌ UNHANDLED ERROR IN WEBHOOK HANDLER ❌❌❌');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error details:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

