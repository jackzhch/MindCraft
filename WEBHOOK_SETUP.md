# Stripe Webhook Setup Guide

This guide explains how to set up Stripe webhooks for order fulfillment in your MindCraft application.

## Overview

When a customer completes a purchase through Stripe Checkout, Stripe sends a webhook event to your server. Your webhook handler:
1. Verifies the webhook signature for security
2. Processes the `checkout.session.completed` event
3. Sends a confirmation email to the customer via Resend

## Prerequisites

- ✅ Stripe account with API keys
- ✅ Resend account with API key
- ✅ Application deployed to Vercel

## Setup Steps

### 1. Configure Environment Variables in Vercel

Go to your Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables for **Production**, **Preview**, and **Development**:

```bash
STRIPE_SECRET_KEY=sk_test_... # or sk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_... for production
```

**Where to get these:**
- **Stripe Keys**: [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
- **Webhook Secret**: [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks) → Click your webhook → Reveal signing secret
- **Resend API Key**: [resend.com/api-keys](https://resend.com/api-keys)

### 2. Create Webhook Endpoint in Stripe

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter endpoint URL: `https://your-domain.vercel.app/api/webhook`
4. Select events to listen to:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.payment_failed` (optional)
5. Click **"Add endpoint"**
6. Click **"Reveal"** under "Signing secret"
7. Copy the `whsec_...` value
8. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`

### 3. Redeploy Your Application

After setting environment variables:

```bash
# Option 1: Push to git (triggers automatic deployment)
git push origin main

# Option 2: Manual redeploy from Vercel Dashboard
# Go to Deployments → Click "..." → Redeploy
```

### 4. Test the Webhook

**Test from Stripe Dashboard:**
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click on your webhook endpoint
3. Click **"Send test webhook"**
4. Select `checkout.session.completed`
5. Click **"Send test webhook"**
6. Should see **✅ 200 OK** response

**Test with Real Payment:**
1. Go to your deployed site
2. Add a product to cart
3. Proceed to checkout
4. Use test card: `4242 4242 4242 4242`
5. Complete the payment
6. Check your email for confirmation

## Monitoring

### Check Webhook Status in Stripe

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click your webhook endpoint
3. View "Recent attempts" to see delivery status

### Check Logs in Vercel

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on your latest deployment
3. Click **"Functions"** tab
4. Click on `/api/webhook`
5. View logs for webhook execution

**Successful webhook logs:**
```
✅ Payment successful: cs_test_abc123...
✅ Purchase confirmation email sent to: customer@example.com
✅ Order fulfilled for: customer@example.com
```

## Troubleshooting

### Webhook Returns 500 Error

**Check:**
1. Environment variables are set in Vercel
2. All variables are enabled for Production environment
3. Application has been redeployed after adding variables

### Webhook Signature Verification Failed

**Solution:**
- Make sure `STRIPE_WEBHOOK_SECRET` matches the signing secret from your Stripe webhook settings
- Each webhook endpoint has a unique secret - verify you're using the correct one

### Email Not Sending

**Check:**
1. `RESEND_API_KEY` is set in Vercel
2. Using the correct "from" email address (for testing: `onboarding@resend.dev`)
3. Check Vercel function logs for email errors

**Note:** The webhook will still succeed (200 OK) even if email fails, so Stripe marks it as delivered.

### No Customer Email Found

If you see "No customer email found in session", make sure:
- Email is collected during Stripe Checkout
- `customer_email` or `customer_details.email` is present in the session

## Testing Locally

To test webhooks locally using Stripe CLI:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhook

# In another terminal, trigger a test webhook
stripe trigger checkout.session.completed
```

The Stripe CLI will provide a webhook secret (`whsec_...`) for local testing. Add it to your `.env.local` file.

## Email Customization

To customize the confirmation email, edit the HTML template in `/api/webhook.ts` in the `sendPurchaseConfirmation` function.

For production, update the "from" address:
```typescript
from: 'MindCraft <noreply@yourdomain.com>'
```

You'll need to verify your domain in Resend first.

## Security Notes

- ✅ Webhook signature verification prevents unauthorized requests
- ✅ Environment variables keep API keys secure
- ✅ Never commit API keys to version control
- ✅ Use test keys for development, live keys for production
- ✅ Rotate keys immediately if accidentally exposed

## Quick Reference

| Environment Variable | Format | Where to Get |
|---------------------|--------|--------------|
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` | [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe webhook settings → Signing secret |
| `RESEND_API_KEY` | `re_...` | [resend.com/api-keys](https://resend.com/api-keys) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` or `pk_live_...` | [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) |

## Support

If you're still experiencing issues:

1. Check Vercel function logs for error details
2. Verify all environment variables are set correctly
3. Test webhook from Stripe Dashboard
4. Review Stripe webhook delivery attempts for error messages

For more details, see the main [README.md](README.md).

