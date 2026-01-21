# Vercel Environment Variables Setup

Copy these to your **Vercel Project Settings → Environment Variables**  
Apply to: **Production**, **Preview**, and **Development** environments

## Required Variables

### Stripe Configuration (Required)
```bash
# Get from: https://dashboard.stripe.com/apikeys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_... for production
STRIPE_SECRET_KEY=sk_test_... # or sk_live_... for production

# Get from: https://dashboard.stripe.com/webhooks (click your webhook → reveal signing secret)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Email Configuration (Required)
```bash
# Get from: https://resend.com/api-keys
RESEND_API_KEY=re_...
```

### AI Assistant (Optional)
```bash
# Get from: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_gemini_api_key
```

## Quick Setup Steps

### 1. Stripe API Keys
1. Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
2. Copy **Publishable key** → Add as `VITE_STRIPE_PUBLISHABLE_KEY`
3. Copy **Secret key** → Add as `STRIPE_SECRET_KEY`

### 2. Stripe Webhook Secret
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Find your webhook endpoint: `https://your-domain.vercel.app/api/webhook`
3. Click on the webhook
4. Click **"Reveal"** under "Signing secret"
5. Copy the `whsec_...` value → Add as `STRIPE_WEBHOOK_SECRET`

### 3. Resend API Key
1. Sign up at [resend.com](https://resend.com)
2. Go to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Copy the `re_...` value → Add as `RESEND_API_KEY`

### 4. Add to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. For EACH variable:
   - Click **Add New**
   - Enter **Key** (e.g., `STRIPE_SECRET_KEY`)
   - Enter **Value** (e.g., `sk_test_abc123...`)
   - Select environments: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

### 5. Redeploy
After adding all variables, you **MUST** redeploy:

**From CLI:**
```bash
vercel --prod
```

**From Vercel Dashboard:**
- Go to Deployments
- Click "..." on latest deployment
- Click "Redeploy"

## Verification

### Test Locally (Before Deploying)
```bash
npm run verify-env
```

This will check if your local `.env.local` file has all required variables with correct format.

### Test on Vercel (After Deploying)

**Option 1: Check Vercel Environment Variables**
- Go to Settings → Environment Variables
- Verify all variables are set
- Values should not be empty

**Option 2: Send Test Webhook**
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click your webhook endpoint
3. Click **"Send test webhook"**
4. Select `checkout.session.completed`
5. Click **"Send test webhook"**
6. Should see **"✅ 200 OK"** response

**Option 3: Check Logs**
1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** → Latest deployment
3. Click **Functions** → `/api/webhook`
4. Look for success messages in logs

## Troubleshooting

### ❌ "Webhook secret not configured"
**Fix:** Add `STRIPE_WEBHOOK_SECRET` to Vercel and redeploy

### ❌ "Webhook signature verification failed"
**Fix:** The webhook secret doesn't match. Get the correct secret from Stripe webhook settings

### ❌ "Email service not configured"
**Fix:** Add `RESEND_API_KEY` to Vercel and redeploy (webhook will still work, but no emails sent)

### ❌ Still getting 500 errors
1. Check Vercel function logs for specific error messages
2. Verify all environment variables are set in Vercel
3. Make sure you redeployed after adding variables
4. See [WEBHOOK_DEBUG_GUIDE.md](WEBHOOK_DEBUG_GUIDE.md) for detailed troubleshooting

## Environment Variable Format Reference

| Variable | Format | Example |
|----------|--------|---------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` or `pk_live_...` | `pk_test_51H7...abc123` |
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` | `sk_test_51H7...xyz789` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | `whsec_abc123xyz789...` |
| `RESEND_API_KEY` | `re_...` | `re_abc123xyz789...` |
| `GEMINI_API_KEY` | Any alphanumeric | `AIzaSyD...` |

## Security Notes

⚠️ **NEVER commit these values to Git**
⚠️ **Use test keys for development, live keys for production**
⚠️ **Rotate keys if accidentally exposed**

## Quick Links

- 🔑 [Stripe API Keys](https://dashboard.stripe.com/apikeys)
- 🪝 [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
- 📧 [Resend API Keys](https://resend.com/api-keys)
- 🤖 [Google AI Studio](https://aistudio.google.com/apikey)
- 🚀 [Vercel Dashboard](https://vercel.com/dashboard)

