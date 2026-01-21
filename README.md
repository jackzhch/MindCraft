<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# MindCraft - Digital Architectures for Thought

An e-commerce platform for digital knowledge management tools with AI-powered assistance and Stripe payment integration.

View your app in AI Studio: https://ai.studio/apps/drive/1Fa-GCezcryTWy1tVw7s5i-gDPghXgM_R

## Features

- 🛒 Modern e-commerce interface for digital products
- 🤖 AI-powered shopping assistant using Google Gemini
- 💳 Secure payment processing with Stripe
- 🎨 Beautiful dark-themed UI with Tailwind CSS
- ⚡ Fast performance with Vite and React 19
- 🚀 Serverless deployment on Vercel

## Quick Start

**Prerequisites:** Node.js (v18+)

1. **Clone and install:**
   ```bash
   git clone <your-repo>
   cd MindCraft
   npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env.local` file:
   ```bash
   # Gemini AI (optional - for AI assistant)
   GEMINI_API_KEY=your_gemini_api_key

   # Stripe (required for payments)
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```

4. **Open:** http://localhost:5173

## Stripe Integration

This app is integrated with Stripe for secure payment processing.

📖 **[See detailed Stripe setup guide →](./STRIPE_SETUP.md)**

Quick setup:
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Dashboard
3. Add them to `.env.local`
4. Test with card: `4242 4242 4242 4242`

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Important:** Add your environment variables in Vercel project settings before deploying.

## Project Structure

```
MindCraft/
├── api/                    # Vercel serverless functions
│   ├── create-checkout-session.ts
│   └── webhook.ts
├── components/             # React components
│   ├── CheckoutModal.tsx
│   ├── GeminiAssistant.tsx
│   └── ...
├── services/              # Service layer
│   ├── stripeService.ts
│   └── geminiService.ts
├── App.tsx                # Main app component
├── constants.ts           # Product catalog
└── types.ts              # TypeScript types
```

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Payments:** Stripe Checkout
- **AI:** Google Gemini API
- **Deployment:** Vercel (serverless functions)
- **Build Tool:** Vite

## Support

- [Stripe Setup Guide](./STRIPE_SETUP.md)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
