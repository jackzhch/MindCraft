# 🚀 Quick Start Guide

Get your MindCraft app with Stripe payments running in 5 minutes!

## Step 1: Install Dependencies (30 seconds)

```bash
cd /Users/chenjie/workspace/MindCraft
npm install
```

## Step 2: Get Stripe Keys (2 minutes)

1. Go to https://dashboard.stripe.com/register
2. Sign up or log in
3. Navigate to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Click **Reveal test key** and copy your **Secret key** (starts with `sk_test_`)

## Step 3: Configure Environment (1 minute)

Create `.env.local` in your project root:

```bash
# Required for Stripe payments
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Optional for AI assistant
GEMINI_API_KEY=
```

**💡 Tip:** You can test without Stripe keys - the app will run in demo mode!

## Step 4: Start Development Server (30 seconds)

```bash
npm run dev
```

Open http://localhost:5173

## Step 5: Test Payment (1 minute)

1. Click **"Add to Cart"** on "The Second Brain OS" ($1.00)
2. Click **cart icon** in navbar
3. Click **"Proceed to Checkout"**
4. Enter your email
5. Click **"Proceed to Payment"**
6. On Stripe page, use test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/34` (any future date)
   - CVC: `123` (any 3 digits)
7. Click **Pay**
8. You'll be redirected back with a success message! 🎉

## That's It! 🎊

Your app is now processing payments through Stripe!

## What's Next?

### Deploy to Production
```bash
# Push to GitHub
git add .
git commit -m "Add Stripe integration"
git push

# Deploy to Vercel (one-click)
# Visit: https://vercel.com/new
```

### Configure for Production
1. Add environment variables in Vercel dashboard
2. Set up webhooks (see `STRIPE_SETUP.md`)
3. Switch to live Stripe keys when ready

## Need Help?

- 📖 **Full Setup:** See `STRIPE_SETUP.md`
- 🚀 **Deployment:** See `DEPLOYMENT.md`
- 🧪 **Testing:** See `TESTING.md`
- 📋 **Summary:** See `INTEGRATION_SUMMARY.md`

## Common Issues

### "Stripe is not configured" message
**Solution:** Add your Stripe keys to `.env.local` and restart the dev server

### Can't find .env.local
**Solution:** Create it in the project root (same folder as `package.json`)

### Payment fails
**Solution:** Make sure you're using test card `4242 4242 4242 4242`

### Server won't start
**Solution:** Run `npm install` to ensure all dependencies are installed

## Test Cards Reference

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 0002` | ❌ Declined |
| `4000 0000 0000 9995` | ❌ Insufficient funds |

Use any future expiry and any 3-digit CVC.

## Project Structure

```
MindCraft/
├── api/                    # Stripe API routes
│   ├── create-checkout-session.ts
│   └── webhook.ts
├── components/             # React components
├── services/              # Business logic
│   └── stripeService.ts   # Stripe integration
├── .env.local            # Your API keys (create this!)
└── package.json
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Yes* | Frontend Stripe key |
| `STRIPE_SECRET_KEY` | Yes* | Backend Stripe key |
| `GEMINI_API_KEY` | No | AI assistant (optional) |

*Can run in demo mode without these

## Ready to Launch? 🚀

1. ✅ Test locally with test cards
2. ✅ Deploy to Vercel
3. ✅ Add environment variables in Vercel
4. ✅ Test production deployment
5. ✅ Switch to live Stripe keys
6. ✅ Announce your launch!

---

**Need more details?** Check out the other documentation files in this folder.

**Questions?** Create an issue or contact Stripe support.

Happy selling! 💰

