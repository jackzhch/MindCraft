# Webhook 500 Error - Debugging Guide

## Issue Summary
Your Stripe webhook is failing with HTTP 500 errors when processing `checkout.session.completed` events.

## Root Cause
The most common causes for webhook 500 errors are:
1. **Missing environment variables** in your Vercel deployment
2. **Invalid API keys** (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY)
3. **Unhandled errors** in the webhook handler

## What I Fixed

### 1. Enhanced Error Handling in Webhook Handler
✅ Added a try-catch wrapper around the entire webhook handler to prevent unhandled errors
✅ Added validation to check if `STRIPE_WEBHOOK_SECRET` exists before processing
✅ Better error logging with specific error messages

### 2. Improved Email Service
✅ Added validation to check if `RESEND_API_KEY` is configured
✅ Provides clear error messages when email service is not configured
✅ The webhook will still succeed even if email fails (as intended)

## How to Fix the Issue

### Step 1: Verify Environment Variables in Vercel

You need to set these environment variables in your Vercel project:

```bash
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

**To set them:**

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable for **Production**, **Preview**, and **Development** environments
5. Redeploy your project

### Step 2: Get Your Stripe Webhook Secret

The webhook secret is specific to each webhook endpoint:

1. Go to Stripe Dashboard: https://dashboard.stripe.com/webhooks
2. Find your webhook endpoint (should point to your Vercel URL + `/api/webhook`)
3. Click on the webhook
4. Click "Reveal" under "Signing secret"
5. Copy the `whsec_...` value

### Step 3: Verify Your Resend API Key

1. Go to Resend Dashboard: https://resend.com/api-keys
2. Make sure you have a valid API key
3. Copy the API key (starts with `re_`)

### Step 4: Redeploy

After setting the environment variables:

```bash
cd /Users/chenjie/workspace/MindCraft
vercel --prod
```

Or simply push to your git repository if you have automatic deployments enabled.

### Step 5: Test the Webhook

1. Go to Stripe Dashboard → Webhooks
2. Click on your webhook
3. Click "Send test webhook"
4. Select `checkout.session.completed` event
5. Click "Send test webhook"

## Verification Checklist

- [ ] All environment variables are set in Vercel
- [ ] STRIPE_SECRET_KEY is correct (starts with sk_test_ or sk_live_)
- [ ] STRIPE_WEBHOOK_SECRET is correct (starts with whsec_)
- [ ] RESEND_API_KEY is correct (starts with re_)
- [ ] Project has been redeployed
- [ ] Test webhook sent successfully

## Checking Logs

To see what's happening in your webhook:

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on your latest deployment
3. Go to the "Functions" tab
4. Click on `/api/webhook`
5. View the logs to see error messages

You should see console.log output like:
- ✅ Payment successful: cs_test_...
- ✅ Order fulfillment completed for: customer@example.com
- OR ❌ Failed to send confirmation email: [error details]

## Common Errors and Solutions

### Error: "Webhook secret not configured"
**Solution:** Set `STRIPE_WEBHOOK_SECRET` in Vercel environment variables

### Error: "No signature header found"
**Solution:** Make sure the webhook URL in Stripe points to the correct endpoint: `https://yourdomain.vercel.app/api/webhook`

### Error: "Webhook signature verification failed"
**Solution:** The `STRIPE_WEBHOOK_SECRET` doesn't match. Get the correct secret from your Stripe webhook settings.

### Error: "Email service not configured"
**Solution:** Set `RESEND_API_KEY` in Vercel environment variables (webhook will still succeed, but no email will be sent)

## What Happens Now

With the updated code:

1. ✅ Webhook will always return a response (no more 500 errors due to unhandled exceptions)
2. ✅ If email sending fails, it will log the error but still acknowledge the webhook (200 OK)
3. ✅ Better error messages in logs to help debug issues
4. ✅ Validation checks for missing environment variables

## Need More Help?

If the webhook is still failing after following these steps:

1. Check the Vercel function logs (see "Checking Logs" section above)
2. Look for specific error messages in the logs
3. Verify that your Stripe webhook endpoint URL is correct
4. Test with Stripe CLI for local debugging:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   stripe trigger checkout.session.completed
   ```

## Testing Locally with Stripe CLI

To test webhooks locally:

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

The CLI will give you a webhook secret (whsec_...) that you can use in your local .env file.

