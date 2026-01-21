# 🚀 Deployment Instructions

## ✅ Your App is Partially Deployed

URL: https://mind-craft-pg39g8ztk-jackzhchs-projects.vercel.app

## 🔧 To Complete the Deployment:

### Step 1: Add Environment Variables

1. Go to: https://vercel.com/jackzhchs-projects/mind-craft/settings/environment-variables

2. Add these variables:

**VITE_STRIPE_PUBLISHABLE_KEY**
```
pk_live_
```

**STRIPE_SECRET_KEY**
```
sk_live_
```

3. Make sure to select **Production**, **Preview**, and **Development** for each variable

### Step 2: Redeploy

After adding the environment variables, redeploy:

```bash
cd /Users/chenjie/workspace/MindCraft
npx vercel --prod
```

### Step 3: Test Your Live Site

1. Visit your production URL
2. Add "The Second Brain OS" to cart
3. Proceed to checkout
4. Complete payment with a real card (it's $1.00)
5. Success! 🎉

## 🔒 Security Note

Your live Stripe keys are now in production. Monitor your payments at:
https://dashboard.stripe.com/payments

## 📊 Your Vercel Dashboard

Project: https://vercel.com/jackzhchs-projects/mind-craft

---

**Once environment variables are added, the payment integration will work perfectly on your live site!**

