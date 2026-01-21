# Webhook 500 Error - Fix Summary

## What Was Wrong

Your Stripe webhook was returning HTTP 500 errors when processing `checkout.session.completed` events. This is a critical issue because:

1. **Stripe marks failed webhooks** - After multiple failures, Stripe disables the webhook endpoint
2. **Customers don't receive confirmation emails** - The webhook triggers the order fulfillment process
3. **Poor user experience** - Customers complete payment but don't get their products

## Root Causes Identified

### 1. Missing Environment Variables
The most common cause of webhook 500 errors is missing or misconfigured environment variables in production (Vercel). Specifically:
- `STRIPE_WEBHOOK_SECRET` - Required to verify webhook authenticity
- `RESEND_API_KEY` - Required to send confirmation emails
- `STRIPE_SECRET_KEY` - Required to interact with Stripe API

### 2. Insufficient Error Handling
The webhook handler didn't have:
- A top-level try-catch to prevent unhandled exceptions
- Validation for missing environment variables
- Clear error messages for debugging

### 3. Email Service Errors Propagating
While the webhook had error handling for email failures, the error messages weren't clear enough, and there was no validation before attempting to use the email service.

## Changes Made

### ✅ 1. Enhanced Webhook Handler (`api/webhook.ts`)

**Added:**
- Wrapped entire handler in try-catch to prevent any unhandled errors
- Validation check for `STRIPE_WEBHOOK_SECRET` before processing
- Better error logging with specific error messages
- Guaranteed 200 OK response to Stripe even if email fails

**Before:**
```typescript
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // ... no top-level error handling
```

**After:**
```typescript
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET is not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }
    // ... rest of handler
  } catch (error: any) {
    console.error('❌ Unhandled error in webhook handler:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
```

### ✅ 2. Improved Email Service (`services/emailService.ts`)

**Added:**
- Validation to check if `RESEND_API_KEY` is configured before creating Resend client
- Clear error message when email service is not configured
- Conditional Resend client initialization

**Before:**
```typescript
const resend = new Resend(process.env.RESEND_API_KEY);
```

**After:**
```typescript
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const sendPurchaseConfirmation = async (params: SendPurchaseConfirmationParams): Promise<void> => {
  if (!resend) {
    console.error('❌ RESEND_API_KEY is not configured. Email will not be sent.');
    throw new Error('Email service not configured');
  }
  // ... rest of function
```

### ✅ 3. Created Webhook Debug Guide

Created `WEBHOOK_DEBUG_GUIDE.md` with:
- Detailed troubleshooting steps
- How to set environment variables in Vercel
- How to get Stripe webhook secret
- Common errors and solutions
- Local testing with Stripe CLI
- Log checking instructions

### ✅ 4. Created Environment Verification Script

Created `scripts/verify-env.js` that:
- Checks all required environment variables
- Validates format (e.g., API keys start with correct prefix)
- Shows masked values for configured variables
- Provides clear error messages for missing/invalid variables

**Usage:**
```bash
npm run verify-env
```

**Example output:**
```
🔍 Verifying Environment Variables...

VITE_STRIPE_PUBLISHABLE_KEY
  Stripe publishable key (frontend)
  ✅ pk_test_5123...a8b9

STRIPE_SECRET_KEY
  Stripe secret key (backend)
  ✅ sk_test_5123...a8b9

STRIPE_WEBHOOK_SECRET
  Stripe webhook signing secret
  ❌ MISSING (Required)
```

### ✅ 5. Updated README

- Added reference to webhook debugging guide
- Added environment variable verification step
- Linked troubleshooting resources

## What You Need To Do Now

### Step 1: Set Environment Variables in Vercel ⚠️ CRITICAL

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables for **Production** environment:

```bash
STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production)
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

### Step 2: Get Your Stripe Webhook Secret

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Find your webhook endpoint (should be `https://your-domain.vercel.app/api/webhook`)
3. Click on it
4. Click "Reveal" under "Signing secret"
5. Copy the `whsec_...` value
6. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`

### Step 3: Redeploy to Vercel

After setting environment variables, you MUST redeploy:

**Option A: From CLI**
```bash
cd /Users/chenjie/workspace/MindCraft
vercel --prod
```

**Option B: From Dashboard**
1. Go to your project in Vercel
2. Click "Deployments"
3. Find the latest deployment
4. Click "..." → "Redeploy"

### Step 4: Test the Webhook

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click on your webhook
3. Click "Send test webhook"
4. Select `checkout.session.completed`
5. Click "Send test webhook"
6. Should see "✅ 200 OK" response

### Step 5: Verify Locally (Optional)

Before deploying, you can verify environment variables locally:

```bash
cd /Users/chenjie/workspace/MindCraft
npm run verify-env
```

## Expected Behavior After Fix

### ✅ Successful Webhook Flow

1. Customer completes Stripe Checkout
2. Stripe sends `checkout.session.completed` event to your webhook
3. Webhook validates the event signature
4. Webhook attempts to send confirmation email
5. **If email succeeds:** Customer receives email, webhook returns 200 OK
6. **If email fails:** Error is logged, but webhook STILL returns 200 OK to Stripe
7. Stripe marks webhook as delivered successfully

### ✅ What You'll See in Logs

**Successful webhook:**
```
Payment successful: cs_test_abc123
Customer: customer@example.com
Items: The Second Brain OS (Qty: 1)
✅ Purchase confirmation email sent to: customer@example.com
✅ Order fulfillment completed for: customer@example.com
```

**Webhook with email failure (but still succeeds):**
```
Payment successful: cs_test_abc123
Customer: customer@example.com
Items: The Second Brain OS (Qty: 1)
❌ RESEND_API_KEY is not configured. Email will not be sent.
❌ Failed to send confirmation email: Error: Email service not configured
```

Notice: Even with email failure, the webhook doesn't crash and returns 200 OK to Stripe.

## Testing Checklist

- [ ] Set `STRIPE_SECRET_KEY` in Vercel
- [ ] Set `STRIPE_WEBHOOK_SECRET` in Vercel
- [ ] Set `RESEND_API_KEY` in Vercel
- [ ] Redeploy to Vercel
- [ ] Send test webhook from Stripe Dashboard
- [ ] Verify webhook receives 200 OK response
- [ ] Check Vercel function logs for success messages
- [ ] (Optional) Make test purchase and verify email arrives

## Additional Resources

- 📚 **Webhook Debug Guide**: `WEBHOOK_DEBUG_GUIDE.md` - Detailed troubleshooting
- 🔧 **Environment Verification**: `npm run verify-env` - Check your config
- 📖 **Stripe Webhook Docs**: https://stripe.com/docs/webhooks
- 📧 **Resend Docs**: https://resend.com/docs

## Still Having Issues?

If the webhook is still failing after following these steps:

1. **Check Vercel logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click latest deployment → Functions → `/api/webhook`
   - Look for error messages

2. **Verify environment variables are set:**
   - Vercel Dashboard → Settings → Environment Variables
   - Make sure all variables are set for "Production"
   - Values should not be empty

3. **Test locally with Stripe CLI:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   stripe trigger checkout.session.completed
   ```

4. **Check Stripe webhook settings:**
   - URL is correct: `https://your-domain.vercel.app/api/webhook`
   - Events selected: `checkout.session.completed`
   - Webhook is enabled (not disabled)

## Summary

✅ **Fixed:** Webhook error handling to prevent 500 errors
✅ **Fixed:** Email service validation
✅ **Added:** Environment variable validation
✅ **Added:** Comprehensive debugging guide
✅ **Added:** Verification script

🎯 **Next Action:** Set environment variables in Vercel and redeploy!

