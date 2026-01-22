<div align="center">
<img width="1200" height="475" alt="MindCraft Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# MindCraft - Digital Architectures for Thought

A modern e-commerce platform for digital knowledge management tools with AI-powered assistance and secure Stripe payment integration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## ✨ Features

- 🛒 **E-commerce Platform** - Modern interface for digital products
- 💳 **Stripe Payments** - Secure payment processing with Stripe Checkout
- 🔐 **User Authentication** - Sign up, login, and user profiles via Supabase Auth
- 📦 **Purchase History** - Track and access all your purchases in one place
- 📧 **Email Notifications** - Automated purchase confirmation emails via Resend
- 🤖 **AI Assistant** - Powered by Google Gemini for personalized recommendations
- 🎨 **Beautiful UI** - Dark-themed design with Tailwind CSS
- ⚡ **Fast & Scalable** - Built with Vite, React 19, and Vercel serverless functions
- 🔒 **Secure** - PCI-compliant payments, RLS database policies, HTTPS everywhere

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

### 2. Set Up Supabase (Required for Auth & Database)

**IMPORTANT:** You need to set up Supabase first for authentication and purchase history.

📚 **Follow the complete setup guide:** [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

Quick summary:
1. Create a free Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema (provided in `supabase-schema.sql`)
3. Get your API keys from Settings → API

### 3. Configure Environment Variables

Create a `.env.local` file in the project root (you can copy from `env.example`):

```bash
# Stripe (required for real payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Supabase (required for auth & database)
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend (required for email notifications)
RESEND_API_KEY=re_YOUR_KEY_HERE

# Optional: AI Assistant
GEMINI_API_KEY=your_gemini_api_key
```

**Get your Supabase keys:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy your **Project URL** and **anon public key**
4. Copy your **service_role key** (keep this secret!)

**Get your Stripe keys:**
1. Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** (`pk_test_...`)
3. Copy your **Secret key** (`sk_test_...`)

**Get your Resend API key:**
1. Sign up at [resend.com](https://resend.com)
2. Go to [API Keys](https://resend.com/api-keys)
3. Create a new API key and copy it

> 💡 **Note:** Supabase is required for authentication and purchase history.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. Test Authentication & Payment

**First, create an account:**
1. Click **"Sign In"** in the navigation
2. Click **"Don't have an account? Sign up"**
3. Enter your email and password
4. Check your email to verify (if email confirmation is enabled)

**Then, test a purchase:**

1. Add "The Second Brain OS" ($9.00) to cart
2. Proceed to checkout
3. Enter your email
4. Use test card: **`4242 4242 4242 4242`**
5. Expiry: any future date (e.g., `12/34`)
6. CVC: any 3 digits (e.g., `123`)
7. Success! 🎉

## 📦 Product Catalog

- **The Second Brain OS** - $9.00 (PARA methodology workspace)
- **Focus Framework 2.0** - $9.00 (Deep work protocol)
- **Stoic Reflection Journal** - $19.00 (Daily reflection templates)
- **Zettelkasten Mastery Guide** - $19.00 (Networked thinking system)
- **Habit Architect** - $29.00 (Behavioral science habits)
- **Cognitive Bias Cheat Sheet** - $29.00 (Decision-making reference)

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
# Stripe (use LIVE keys for production)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase (same keys work for production)
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend
RESEND_API_KEY=re_...

# Optional
GEMINI_API_KEY=your_key
```

### Set Up Stripe Webhooks

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. URL: `https://your-domain.vercel.app/api/webhook`
4. Select events: `checkout.session.completed`, `payment_intent.payment_failed`
5. Copy **Signing secret** and add as `STRIPE_WEBHOOK_SECRET` in Vercel
6. Redeploy

> 📚 **For detailed webhook setup instructions**, see [WEBHOOK_SETUP.md](WEBHOOK_SETUP.md)

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
│   ├── emailService.ts           # Email notifications (Resend)
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
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe Checkout API
- **Email:** Resend API
- **AI:** Google Gemini API
- **Deployment:** Vercel (serverless functions)
- **API Version:** Stripe 2025-12-15.clover

## 📧 Email Customization

The purchase confirmation emails are sent via Resend and can be customized in `services/emailService.ts`.

### Customizing the Email Template

1. **Sender Email:** Update the `from` field in `emailService.ts`
   - For testing: `'MindCraft <onboarding@resend.dev>'`
   - For production: `'MindCraft <noreply@yourdomain.com>'` (requires domain verification in Resend)

2. **Email Content:** Modify the HTML template in the `sendPurchaseConfirmation` function

3. **Subject Line:** Change the `subject` field (currently: "Purchase Confirmation from MindCraft")

### Verifying Your Domain in Resend

To use a custom sender email in production:
1. Go to [Resend Dashboard → Domains](https://resend.com/domains)
2. Add your domain and verify DNS records
3. Update the `from` email in `emailService.ts`

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

### Confirmation Emails Not Sending
**Solution:**
- Verify `RESEND_API_KEY` is set in environment variables
- Check Resend Dashboard for email logs and errors
- Ensure "from" email domain is verified in Resend (or use `onboarding@resend.dev` for testing)
- Review webhook logs in Vercel for email sending errors

## 📚 Additional Resources

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Complete guide for authentication and database
- [Webhook Setup Guide](./WEBHOOK_SETUP.md) - Complete guide for webhooks and email notifications
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 🎯 Going Live Checklist

- [ ] Set up Supabase project and run schema
- [ ] Enable email confirmations in Supabase Auth
- [ ] Test authentication (signup, login, logout)
- [ ] Test all features with Stripe test cards
- [ ] Deploy to Vercel
- [ ] Add ALL environment variables in Vercel (Supabase, Stripe, Resend)
- [ ] Set up Stripe webhooks pointing to production URL
- [ ] Switch to live Stripe keys
- [ ] Test with small real transaction
- [ ] Verify purchase appears in database and purchase history
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
