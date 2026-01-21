# Deployment Guide

## Deploying to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Stripe account with API keys

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit with Stripe integration"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Step 3: Add Environment Variables

In Vercel project settings, add these environment variables:

#### Required for Payments:
```
VITE_STRIPE_PUBLISHABLE_KEY = pk_test_... (or pk_live_...)
STRIPE_SECRET_KEY = sk_test_... (or sk_live_...)
```

#### Optional (for AI assistant):
```
GEMINI_API_KEY = your_gemini_api_key
```

#### Required for Production Webhooks:
```
STRIPE_WEBHOOK_SECRET = whsec_...
```

**Important:** Make sure to add these to all environments (Production, Preview, Development)

### Step 4: Deploy

Click **Deploy** and wait for the build to complete.

### Step 5: Configure Stripe Webhooks

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Enter webhook URL: `https://your-vercel-domain.vercel.app/api/webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the signing secret and update `STRIPE_WEBHOOK_SECRET` in Vercel
6. Redeploy your app

### Step 6: Test Your Deployment

1. Visit your deployed URL
2. Add "The Second Brain OS" to cart
3. Proceed to checkout
4. Use test card: `4242 4242 4242 4242`
5. Verify successful payment

## Environment Variables Reference

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key (frontend) | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key (backend) | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | Production | Webhook signing secret | [Stripe Webhooks](https://dashboard.stripe.com/webhooks) |
| `GEMINI_API_KEY` | No | Google Gemini API key | [AI Studio](https://aistudio.google.com/app/apikey) |

## Vercel Configuration

The `vercel.json` file is already configured with:

- API route rewrites for `/api/*` endpoints
- SPA fallback for client-side routing
- Proper build and output settings

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility
- Review build logs in Vercel dashboard

### API Routes Not Working
- Ensure `vercel.json` has correct rewrites
- Check that environment variables are set
- Review function logs in Vercel dashboard

### Stripe Checkout Fails
- Verify `STRIPE_SECRET_KEY` is set correctly
- Check API route logs for errors
- Ensure publishable and secret keys are from the same Stripe account

### Webhooks Not Triggering
- Verify webhook URL matches your deployment URL
- Check webhook signing secret matches environment variable
- Review webhook logs in Stripe Dashboard

## Going Live

When ready for production:

1. **Activate Stripe Account**
   - Complete business verification
   - Add bank account details

2. **Switch to Live Keys**
   - Replace test keys with live keys in Vercel
   - Update webhook endpoint to use live mode

3. **Test Thoroughly**
   - Test with real cards (small amounts)
   - Verify email delivery
   - Check webhook processing

4. **Monitor**
   - Set up Stripe alerts
   - Monitor Vercel analytics
   - Review error logs regularly

## Custom Domain (Optional)

1. Go to Vercel project > Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update Stripe webhook URL to use custom domain

## Security Checklist

- ✅ Never commit `.env.local` or API keys to git
- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS (automatic with Vercel)
- ✅ Validate webhook signatures
- ✅ Keep dependencies updated
- ✅ Monitor for security alerts

## Support

- Vercel Support: https://vercel.com/support
- Stripe Support: https://support.stripe.com
- GitHub Issues: Create an issue in your repository

