import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { sendPurchaseConfirmation } from './_emailService';

// Get environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

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

