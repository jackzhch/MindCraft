# Email Setup Guide for MindCraft

## 🚨 Important: Why Emails Only Go To Your Address

If emails are only being sent to your own email address and not to customers, this is because you're using Resend's **test sender address** (`onboarding@resend.dev`).

### The Problem

Resend restricts the test sender `onboarding@resend.dev` to **only send emails to your verified email address** (the one you used to sign up). This is a security measure to prevent spam.

### The Solution

You need to add and verify your own domain in Resend.

---

## 📝 Step-by-Step Setup

### Option 1: Add Your Own Domain (Recommended - Production Ready)

#### 1. Add Domain to Resend

1. Go to [Resend Domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourdomain.com` or `mindcraft.app`)

#### 2. Configure DNS Records

Resend will show you DNS records to add. Add these to your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare):

- **SPF Record** (TXT)
- **DKIM Records** (TXT) - Usually 3 records
- **DMARC Record** (TXT) - Optional but recommended

**Example DNS Records:**
```
Type: TXT
Name: @
Value: v=spf1 include:amazonses.com ~all

Type: TXT
Name: resend._domainkey
Value: [provided by Resend]
```

#### 3. Wait for Verification

- Usually takes **5-30 minutes** for DNS propagation
- Resend will automatically verify once DNS records are detected
- You'll see a green checkmark when verified

#### 4. Update Environment Variables

**For Local Development** (`.env.local`):
```bash
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=MindsCraft <noreply@yourdomain.com>
```

**For Production** (Vercel Dashboard or CLI):
```bash
vercel env add RESEND_FROM_EMAIL
# Enter: MindsCraft <noreply@yourdomain.com>
```

#### 5. Restart Your App

**Local:**
```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

**Production:**
```bash
# Redeploy
vercel --prod
```

---

### Option 2: Use Resend's Test Mode (For Testing Only)

If you don't have a domain yet and just want to test, you can:

1. **Only test with your own email** (the one you signed up with on Resend)
2. **Add additional test emails** in Resend Dashboard:
   - Go to [Resend Settings → Emails](https://resend.com/settings/emails)
   - Add verified test recipient emails

**Limitations:**
- ❌ Can't send to real customer emails
- ❌ Not suitable for production
- ✅ Good for development/testing

---

## 🧪 Testing Your Setup

### 1. Check Current Configuration

Run this in your terminal to verify environment variables:

```bash
cd /Users/chenjie/workspace/MindCraft

# Check if .env.local exists
cat .env.local | grep RESEND
```

You should see:
```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=MindsCraft <noreply@yourdomain.com>
```

### 2. Test Email Sending

1. Make a test purchase with a **different email address** than your Resend account
2. Check Vercel logs:
   ```bash
   vercel logs --follow
   ```
3. Look for:
   - ✅ `Email sent successfully to: customer@example.com`
   - ❌ `Failed to send email:` (check error message)

### 3. Check Resend Dashboard

1. Go to [Resend Logs](https://resend.com/logs)
2. You should see:
   - **Delivered** status for successful emails
   - **Failed** status with error details if something went wrong

---

## 🔧 Troubleshooting

### Issue: "Email sent successfully" but customer didn't receive it

**Possible causes:**
1. **Spam folder** - Check customer's spam/junk folder
2. **Domain not verified** - Verify your domain in Resend dashboard
3. **DNS not propagated** - Wait longer for DNS changes (can take up to 48 hours)

**Solution:**
- Use a domain email tester: [MXToolbox](https://mxtoolbox.com/SuperTool.aspx)
- Check Resend logs for delivery status
- Try sending to a different email provider (Gmail, Outlook, etc.)

### Issue: "Email service not configured"

**Cause:** Missing `RESEND_API_KEY` environment variable

**Solution:**
```bash
# Add to .env.local
echo "RESEND_API_KEY=re_your_key" >> .env.local

# For Vercel
vercel env add RESEND_API_KEY
```

### Issue: Emails still only go to my address

**Cause:** Still using `onboarding@resend.dev`

**Solution:**
1. Verify your domain is fully verified (green checkmark) in Resend
2. Update `RESEND_FROM_EMAIL` to use your domain
3. Restart your application

---

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Domain Setup](https://resend.com/docs/dashboard/domains/introduction)
- [DNS Configuration Guide](https://resend.com/docs/dashboard/domains/verifying)
- [Troubleshooting Email Delivery](https://resend.com/docs/dashboard/emails/troubleshooting)

---

## 🎯 Quick Checklist

Before going to production, make sure:

- [ ] Domain added and verified in Resend (green checkmark)
- [ ] All DNS records configured correctly
- [ ] `RESEND_FROM_EMAIL` environment variable set to your domain
- [ ] Environment variables added to Vercel (production)
- [ ] Tested email sending to a non-owner email address
- [ ] Checked spam folder and delivery logs
- [ ] Stripe webhook configured and working

---

## 💡 Recommended Domains for Email

If you don't have a domain yet:

**Cheap Domain Registrars:**
- [Namecheap](https://www.namecheap.com) - ~$10/year
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) - At-cost pricing
- [Google Domains](https://domains.google) - ~$12/year

**Free Alternatives for Testing:**
- Use a subdomain if you already own a domain (e.g., `app.yourdomain.com`)
- Some registrars offer free subdomains

---

## 🆘 Still Having Issues?

1. Check [Resend Status Page](https://resend.com/status)
2. Review [Resend Logs](https://resend.com/logs) for detailed error messages
3. Contact [Resend Support](https://resend.com/support)
4. Check your Vercel deployment logs for webhook errors

---

**Last Updated:** January 22, 2026

