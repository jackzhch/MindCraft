# Stripe Integration Setup Guide

This guide will help you integrate Stripe payments with your MindCraft app.

## Prerequisites

- A Stripe account (create one at https://stripe.com)
- Node.js installed
- Your app deployed or running locally

## Setup Steps

### 1. Get Your Stripe API Keys

1. Log into your Stripe Dashboard: https://dashboard.stripe.com
2. Click on **Developers** in the left sidebar
3. Click on **API keys**
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)
   - Click "Reveal test key" to see the secret key

### 2. Configure Environment Variables

Create a `.env.local` file in your project root with the following:

```bash
# Gemini AI API Key (for AI assistant)
GEMINI_API_KEY=your_gemini_api_key_here

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Stripe Webhook Secret (optional for local dev, required for production)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Important:** 
- `VITE_STRIPE_PUBLISHABLE_KEY` is used in the frontend (safe to expose)
- `STRIPE_SECRET_KEY` is used in the backend API (must be kept secret!)
- Never commit `.env.local` to version control

### 3. Set Up Stripe Product

Your Stripe product "The Second Brain OS" should match the configuration:

1. Go to Stripe Dashboard > **Products**
2. Verify your product exists with the correct price ($1.00 USD)
3. Note: The app uses dynamic pricing, so you don't need to create a specific Price ID

### 4. Deploy to Vercel (Production)

#### Add Environment Variables to Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** > **Environment Variables**
3. Add the following variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_test_...` or `pk_live_...`
   - `STRIPE_SECRET_KEY` = `sk_test_...` or `sk_live_...`
   - `STRIPE_WEBHOOK_SECRET` = `whsec_...` (see step 5)

4. Redeploy your app for the changes to take effect

### 5. Set Up Webhooks (Optional but Recommended)

Webhooks allow Stripe to notify your app about payment events:

1. Go to Stripe Dashboard > **Developers** > **Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL: `https://yourdomain.com/api/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add it to your environment variables as `STRIPE_WEBHOOK_SECRET`

### 6. Test the Integration

#### Test Mode (using test keys):

1. Add products to cart
2. Proceed to checkout
3. Use Stripe test card numbers:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - Use any future expiry date and any 3-digit CVC

#### Test Webhooks Locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-brew/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:5173/api/webhook

# Copy the webhook signing secret displayed and add to .env.local
```

### 7. Go Live

When ready for production:

1. Complete your Stripe account activation
2. Replace test keys with live keys (`pk_live_...` and `sk_live_...`)
3. Create a production webhook pointing to your live domain
4. Test with real cards in small amounts first

## Security Best Practices

- ✅ Never expose your `STRIPE_SECRET_KEY` in frontend code
- ✅ Always validate webhook signatures using `STRIPE_WEBHOOK_SECRET`
- ✅ Use HTTPS in production
- ✅ Keep Stripe.js library updated
- ✅ Implement proper error handling
- ✅ Log transactions for auditing

## Troubleshooting

### "Stripe is not configured" message appears
- Check that `VITE_STRIPE_PUBLISHABLE_KEY` is set correctly
- Restart your dev server after adding environment variables
- Verify the key starts with `pk_test_` or `pk_live_`

### Checkout redirect fails
- Verify `STRIPE_SECRET_KEY` is set in your Vercel environment variables
- Check Vercel deployment logs for API errors
- Ensure your domain is allowed in Stripe Dashboard > Settings > Branding

### Webhooks not working
- Verify the webhook URL is correct
- Check that `STRIPE_WEBHOOK_SECRET` matches your webhook endpoint
- Review webhook logs in Stripe Dashboard > Developers > Webhooks

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Test your integration: https://stripe.com/docs/testing

## Current Product Configuration

Based on your Stripe catalog:

- **Product:** The Second Brain OS
- **Price:** $1.00 USD
- **Tax Category:** General - Electronically Supplied Services

The app will automatically create checkout sessions with this pricing.

