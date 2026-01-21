# Running Locally with Stripe Integration

## ⚠️ Important: API Routes Need Vercel CLI

The `/api/*` routes are Vercel serverless functions and won't work with just `npm run dev`.

## ✅ Correct Way to Run Locally

### Step 1: Stop the current server
Press `Ctrl+C` in your terminal

### Step 2: Run with Vercel CLI
```bash
vercel dev
```

This will:
- Start the Vite dev server
- Run the API routes (create-checkout-session, webhook)
- Handle routing automatically
- Open on http://localhost:3000 (or similar)

### Step 3: Test
- Open the URL shown in terminal
- Add "The Second Brain OS" to cart
- Proceed to checkout
- It should now work! ✅

## 🔧 If You Need Test Keys

Get them from: https://dashboard.stripe.com/test/apikeys

Then update `.env.local`:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
```

## 📝 Commands Summary

| Command | What it does |
|---------|--------------|
| `npm run dev` | ❌ Frontend only, API routes don't work |
| `vercel dev` | ✅ Frontend + API routes working |
| `vercel` | Deploy to production |
