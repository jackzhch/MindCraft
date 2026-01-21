# Email Notification Setup Guide

## Overview

This guide explains the automated email notification system that sends purchase confirmation emails to customers after successful payments.

## What Was Implemented

### 1. Email Service (`services/emailService.ts`)
- Professional email service using Resend API
- Beautiful HTML email template with MindCraft branding
- Support for customer name personalization
- Order details in confirmation emails

### 2. Webhook Integration (`api/webhook.ts`)
- Automatically triggers email on successful payment
- Extracts customer email and name from Stripe session
- Includes order details from metadata
- Graceful error handling (doesn't fail webhook if email fails)

### 3. Email Template Features
- **Subject:** "Purchase Confirmation from MindCraft"
- **Message:** "Here is your product, thank you for purchasing!"
- Gradient header with MindCraft branding
- Personalized greeting (if customer name available)
- Order summary section
- Next steps guidance
- Professional footer
- Mobile-responsive design

## Setup Instructions

### Step 1: Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Create a free account (100 emails/day free tier)
3. Verify your email address

### Step 2: Get API Key

1. Go to [Resend Dashboard → API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "MindCraft Production")
4. Copy the API key (starts with `re_`)

### Step 3: Configure Environment Variables

Add to your `.env.local` file:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

For Vercel deployment, add the same in:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

### Step 4: Test Locally

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Make sure Stripe webhooks are forwarding to your local server:
   ```bash
   stripe listen --forward-to localhost:5173/api/webhook
   ```

3. Complete a test purchase:
   - Add product to cart
   - Go to checkout
   - Use test card: `4242 4242 4242 4242`
   - Enter your email address
   - Complete payment

4. Check your email inbox for the confirmation!

### Step 5: Verify in Resend Dashboard

1. Go to [Resend Dashboard → Logs](https://resend.com/logs)
2. You should see your sent emails
3. Click on an email to see delivery status and preview

## Email Customization

### Change the Sender Email

**For Testing:**
```typescript
from: 'MindCraft <onboarding@resend.dev>'
```

**For Production:**
```typescript
from: 'MindCraft <noreply@yourdomain.com>'
```
*(Requires domain verification in Resend)*

### Verify Your Domain in Production

1. Go to [Resend Dashboard → Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `mindcraft.com`)
4. Add the DNS records to your domain provider
5. Wait for verification (usually a few minutes)
6. Update the `from` email in `services/emailService.ts`

### Customize Email Content

Edit `services/emailService.ts` to customize:
- Subject line
- Email body HTML
- Colors and styling
- Additional information

### Example Customization

```typescript
// Change subject
subject: 'Your MindCraft Order is Ready! 🎉',

// Add more details
html: `
  <h2>Order Details</h2>
  <p>Order ID: ${session.id}</p>
  <p>Total: $${(session.amount_total / 100).toFixed(2)}</p>
  ...
`
```

## Testing

### Test Successful Purchase

1. Complete a purchase with test card `4242 4242 4242 4242`
2. Check email inbox
3. Verify email received with correct information
4. Check Resend logs for delivery status

### Test Email Delivery

```bash
# Trigger test webhook event
stripe trigger checkout.session.completed
```

### Check Webhook Logs

In Vercel Dashboard:
1. Go to **Deployments → Latest Deployment**
2. Click **Functions** tab
3. Find `/api/webhook`
4. Check logs for email sending status:
   - ✅ Success: "Purchase confirmation email sent to: ..."
   - ❌ Error: "Failed to send confirmation email: ..."

## Troubleshooting

### Email Not Received

**Check Resend Dashboard:**
1. Go to [Resend Logs](https://resend.com/logs)
2. Look for failed deliveries
3. Check error messages

**Common Issues:**
- API key not set correctly → Verify `RESEND_API_KEY` in environment
- Email in spam folder → Check spam/junk folder
- Invalid sender domain → Use `onboarding@resend.dev` for testing
- Rate limit exceeded → Free tier has 100 emails/day limit

### Webhook Not Triggering

1. Verify webhook is set up in Stripe Dashboard
2. Check webhook endpoint: `https://yourdomain.vercel.app/api/webhook`
3. Verify `STRIPE_WEBHOOK_SECRET` is set
4. Check Stripe webhook logs for errors

### Email Sending Error in Logs

**Error:** `Failed to send confirmation email: Unauthorized`
- **Solution:** Check `RESEND_API_KEY` is correct and active

**Error:** `Failed to send confirmation email: Invalid sender`
- **Solution:** Use `onboarding@resend.dev` or verify your domain

**Error:** `Failed to send confirmation email: Rate limit exceeded`
- **Solution:** Upgrade Resend plan or wait for rate limit reset

### No Customer Email in Session

If logs show: "⚠️ No customer email found in session"
- Ensure customer enters email in Stripe Checkout
- Check Stripe Checkout session configuration
- Verify `customer_email` is collected in checkout settings

## Email Deliverability Best Practices

### For Production

1. **Verify Your Domain**
   - Use your own domain instead of `onboarding@resend.dev`
   - Add SPF, DKIM, and DMARC records
   - Improves deliverability and trust

2. **Use Transactional Email Address**
   - `noreply@yourdomain.com`
   - `orders@yourdomain.com`
   - `support@yourdomain.com`

3. **Monitor Email Metrics**
   - Open rates
   - Bounce rates
   - Spam complaints

4. **Keep Content Relevant**
   - Clear subject line
   - Concise message
   - Professional formatting
   - Include unsubscribe link for marketing emails (not required for transactional)

## Scaling Considerations

### Free Tier (Resend)
- **Limit:** 100 emails/day
- **Price:** Free
- **Good for:** Testing, small projects

### Growth Plans
- **Pro Plan:** $20/month - 50,000 emails/month
- **Enterprise:** Custom pricing

### Monitoring

Set up monitoring for:
- Email delivery rates
- Failed email attempts
- API rate limits
- Customer complaints

## Next Steps

### Enhance Email Template

Consider adding:
- Download links for digital products
- Account login instructions
- Product preview or images
- Customer support contact info
- Social media links
- Related product recommendations

### Add More Email Types

Implement additional email notifications:
- Order confirmation with receipt
- Payment failed notification
- Refund confirmation
- Welcome email for new customers
- Abandoned cart reminders

### Track Email Engagement

Integrate email tracking:
- Open rate tracking
- Click tracking for links
- Conversion tracking

## Support Resources

- **Resend Documentation:** [resend.com/docs](https://resend.com/docs)
- **Resend Support:** [resend.com/support](https://resend.com/support)
- **Stripe Webhooks Guide:** [stripe.com/docs/webhooks](https://stripe.com/docs/webhooks)
- **MindCraft Issues:** Create an issue on GitHub

---

**Email notifications successfully implemented! 📧✨**

Your customers will now receive beautiful confirmation emails after every successful purchase.

