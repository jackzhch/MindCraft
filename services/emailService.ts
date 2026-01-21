import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendPurchaseConfirmationParams {
  customerEmail: string;
  customerName?: string;
  items?: string;
}

export const sendPurchaseConfirmation = async (params: SendPurchaseConfirmationParams): Promise<void> => {
  const { customerEmail, customerName, items } = params;

  try {
    // Note: Update the 'from' address to your verified domain in production
    // For testing, you can use: onboarding@resend.dev
    // For production: 'MindCraft <noreply@yourdomain.com>'
    await resend.emails.send({
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

    console.log('✅ Purchase confirmation email sent to:', customerEmail);
  } catch (error) {
    console.error('❌ Failed to send purchase confirmation email:', error);
    throw error;
  }
};

