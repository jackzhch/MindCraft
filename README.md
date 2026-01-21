<div align="center">
<img width="1200" height="475" alt="MindCraft Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# MindCraft - Digital Architectures for Thought

A modern e-commerce platform for digital knowledge management tools with AI-powered assistance and secure Stripe payment integration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## ✨ Features

- 🛒 **E-commerce Platform** - Modern interface for digital products
- 💳 **Stripe Payments** - Secure payment processing with Stripe Checkout
- 🤖 **AI Assistant** - Powered by Google Gemini for personalized recommendations
- 🎨 **Beautiful UI** - Dark-themed design with Tailwind CSS
- ⚡ **Fast & Scalable** - Built with Vite, React 19, and Vercel serverless functions
- 🔒 **Secure** - PCI-compliant payments, HTTPS, environment-based configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Node.js 24.x (recommended)
- Stripe account (sign up at [stripe.com](https://stripe.com))

### 1. Install Dependencies

```bash
git clone https://github.com/jackzhch/MindCraft.git
cd MindCraft
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Stripe (required for real payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Optional: AI Assistant
GEMINI_API_KEY=your_gemini_api_key
```

**Get your Stripe keys:**
1. Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** (`pk_test_...`)
3. Copy your **Secret key** (`sk_test_...`)

> 💡 **Tip:** The app works in demo mode without keys!

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Test Payment

1. Add "The Second Brain OS" ($1.00) to cart
2. Proceed to checkout
3. Enter your email
4. Use test card: **`4242 4242 4242 4242`**
5. Expiry: any future date (e.g., `12/34`)
6. CVC: any 3 digits (e.g., `123`)
7. Success! 🎉

## 📦 Product Catalog

- **The Second Brain OS** - $1.00 (PARA methodology workspace)
- **Focus Framework 2.0** - $29.00 (Deep work protocol)
- **Stoic Reflection Journal** - $19.00 (Daily reflection templates)
- **Zettelkasten Mastery Guide** - $35.00 (Networked thinking system)
- **Habit Architect** - $24.00 (Behavioral science habits)
- **Cognitive Bias Cheat Sheet** - $12.00 (Decision-making reference)

## 🚀 Deployment to Vercel

### Quick Deploy

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push

# Deploy to Vercel
# Visit: https://vercel.com/new and import your repository
```

### Environment Variables for Production

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Use live keys for production
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...  # Get from Stripe Webhooks settings
GEMINI_API_KEY=your_key  # Optional
```

### Set Up Stripe Webhooks

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. URL: `https://your-domain.vercel.app/api/webhook`
4. Select events: `checkout.session.completed`, `payment_intent.payment_failed`
5. Copy **Signing secret** and add as `STRIPE_WEBHOOK_SECRET` in Vercel
6. Redeploy

## 🧪 Testing

### Test Cards

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 0002` | ❌ Declined |
| `4000 0000 0000 9995` | ❌ Insufficient funds |

Use any future expiry and any 3-digit CVC.

### Test Scenarios

1. **Successful Purchase** - Use card `4242 4242 4242 4242`
2. **Declined Payment** - Use card `4000 0000 0000 0002`
3. **Canceled Checkout** - Click back on Stripe page
4. **Multiple Items** - Add multiple products with different quantities

### Testing Webhooks Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-brew/stripe

# Forward webhooks to local server
stripe listen --forward-to localhost:5173/api/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

## 📁 Project Structure

```
MindCraft/
├── api/                          # Vercel serverless functions
│   ├── create-checkout-session.ts  # Creates Stripe Checkout sessions
│   └── webhook.ts                   # Handles Stripe webhook events
├── components/                   # React components
│   ├── GeminiAssistant.tsx       # AI chat interface
│   ├── CheckoutModal.tsx         # Stripe checkout integration
│   ├── CartDrawer.tsx            # Shopping cart
│   └── ...
├── services/                     # Business logic
│   ├── stripeService.ts          # Stripe integration
│   └── geminiService.ts          # AI assistant logic
├── App.tsx                       # Main application
├── constants.ts                  # Product catalog
├── types.ts                      # TypeScript definitions
├── .env.local                    # Local environment variables (create this!)
└── vercel.json                   # Vercel configuration
```

## 🔧 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **Payments:** Stripe Checkout API
- **AI:** Google Gemini API
- **Deployment:** Vercel (serverless functions)
- **API Version:** Stripe 2025-12-15.clover

## 💻 Development

### Available Commands

```bash
npm run dev      # Start development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

### Running with Vercel CLI (For API Routes)

If you need to test API routes locally:

```bash
vercel dev       # Runs both frontend and serverless functions
```

## 🔒 Security

- ✅ PCI-compliant payment processing via Stripe
- ✅ Webhook signature verification
- ✅ No card data stored on servers
- ✅ Environment-based configuration
- ✅ HTTPS enforced (automatic with Vercel)
- ✅ Secret keys never exposed in frontend

### Security Checklist

- Never commit `.env.local` or API keys to git
- Use test keys (`pk_test_`, `sk_test_`) for development
- Switch to live keys (`pk_live_`, `sk_live_`) for production
- Keep dependencies updated
- Monitor Stripe Dashboard for suspicious activity

## 🐛 Troubleshooting

### "Stripe is not configured" Message
**Solution:** Add `VITE_STRIPE_PUBLISHABLE_KEY` to `.env.local` and restart dev server

### Checkout Redirect Fails
**Solution:** Verify `STRIPE_SECRET_KEY` is set correctly in environment variables

### Build Fails on Vercel
**Solution:** 
- Check all dependencies are in `package.json`
- Verify Node.js version (18+ or 24.x)
- Review build logs in Vercel Dashboard

### Webhooks Not Working
**Solution:**
- Verify webhook URL matches deployment URL
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
- Review webhook logs in Stripe Dashboard

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 🎯 Going Live Checklist

- [ ] Test all features with test cards
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel
- [ ] Set up Stripe webhooks
- [ ] Switch to live Stripe keys
- [ ] Test with small real transaction
- [ ] Monitor for 24 hours
- [ ] Announce launch! 🎊

## 🤝 Support

- **Stripe Support:** [support.stripe.com](https://support.stripe.com)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Issues:** Create an issue on GitHub

## 📝 License

See [LICENSE](./LICENSE) file for details.

---

**Built with ❤️ for knowledge workers and digital product creators**

View your app in AI Studio: https://ai.studio/apps/drive/1Fa-GCezcryTWy1tVw7s5i-gDPghXgM_R
