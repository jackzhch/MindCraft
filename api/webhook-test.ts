import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Diagnostic endpoint to test webhook configuration
 * Access at: /api/webhook-test
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      hasStripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
      stripeSecretKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) || 'missing',
      hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      webhookSecretPrefix: process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 6) || 'missing',
      hasResendApiKey: !!process.env.RESEND_API_KEY,
      resendApiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 3) || 'missing',
    },
    request: {
      method: req.method,
      headers: {
        'content-type': req.headers['content-type'],
        'user-agent': req.headers['user-agent'],
      },
    },
    status: 'OK',
  };

  // Check for issues
  const issues = [];
  
  if (!process.env.STRIPE_SECRET_KEY) {
    issues.push('STRIPE_SECRET_KEY is missing');
  } else if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    issues.push('STRIPE_SECRET_KEY has invalid format (should start with sk_test_ or sk_live_)');
  }
  
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    issues.push('STRIPE_WEBHOOK_SECRET is missing');
  } else if (!process.env.STRIPE_WEBHOOK_SECRET.startsWith('whsec_')) {
    issues.push('STRIPE_WEBHOOK_SECRET has invalid format (should start with whsec_)');
  }
  
  if (!process.env.RESEND_API_KEY) {
    issues.push('RESEND_API_KEY is missing');
  } else if (!process.env.RESEND_API_KEY.startsWith('re_')) {
    issues.push('RESEND_API_KEY has invalid format (should start with re_)');
  }

  if (issues.length > 0) {
    return res.status(200).json({
      ...diagnostics,
      status: 'ISSUES_FOUND',
      issues,
    });
  }

  return res.status(200).json(diagnostics);
}

