import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Simple test endpoint to verify environment variables are accessible
 * Visit: /api/test-env
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    timestamp: new Date().toISOString(),
    environment: 'production',
    envVars: {
      hasStripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
      stripeSecretKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) || 'MISSING',
      hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      webhookSecretPrefix: process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 8) || 'MISSING',
      hasResendApiKey: !!process.env.RESEND_API_KEY,
      resendApiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 3) || 'MISSING',
    },
  });
}

