# Email Setup for mindscraft.cc

## Quick Setup Guide

### 1. Add Domain to Resend

1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Enter: `mindscraft.cc`
4. Click "Add"

### 2. Copy DNS Records

Resend will show you several DNS records. You need to add ALL of them to your domain registrar.

**Example of what you'll see:**

| Type | Name | Value | Priority |
|------|------|-------|----------|
| TXT | @ | v=spf1 include:amazonses.com ~all | - |
| TXT | resend._domainkey | [long string from Resend] | - |
| TXT | resend2._domainkey | [long string from Resend] | - |
| TXT | resend3._domainkey | [long string from Resend] | - |

### 3. Add Records to Your Domain Registrar

**Where to go:**
- If registered with Namecheap: Dashboard → Domain List → Manage → Advanced DNS
- If using Cloudflare: Dashboard → mindscraft.cc → DNS → Records
- If registered with GoDaddy: My Products → Domains → DNS Management

**What to add:**
- Copy each record EXACTLY as shown in Resend
- Add all 4 TXT records
- Save changes

### 4. Update Environment Variables

#### For Local Development

Edit your `.env.local` file and add/update this line:

```bash
RESEND_FROM_EMAIL=MindsCraft <noreply@mindscraft.cc>
```

Or use this command to update it:

```bash
cd /Users/chenjie/workspace/MindCraft

# Backup existing .env.local
cp .env.local .env.local.backup

# Add RESEND_FROM_EMAIL if it doesn't exist
if ! grep -q "RESEND_FROM_EMAIL" .env.local; then
    echo "" >> .env.local
    echo "# Email Sender (verified domain)" >> .env.local
    echo "RESEND_FROM_EMAIL=MindsCraft <noreply@mindscraft.cc>" >> .env.local
else
    # Update existing line
    sed -i '' 's/RESEND_FROM_EMAIL=.*/RESEND_FROM_EMAIL=MindsCraft <noreply@mindscraft.cc>/' .env.local
fi

echo "✅ Updated .env.local with mindscraft.cc email"
```

#### For Production (Vercel)

Run these commands:

```bash
# Set the email sender for production
vercel env add RESEND_FROM_EMAIL production
# When prompted, enter: MindsCraft <noreply@mindscraft.cc>

# Set for preview environments too (optional)
vercel env add RESEND_FROM_EMAIL preview
# When prompted, enter: MindsCraft <noreply@mindscraft.cc>

# Redeploy to production
vercel --prod
```

Or add it via Vercel Dashboard:
1. Go to: https://vercel.com/dashboard
2. Select your MindCraft project
3. Go to Settings → Environment Variables
4. Add new variable:
   - Key: `RESEND_FROM_EMAIL`
   - Value: `MindsCraft <noreply@mindscraft.cc>`
   - Environment: Production (and Preview if you want)
5. Save and redeploy

### 5. Wait for Verification

- DNS changes can take **5-30 minutes** (sometimes up to 48 hours)
- Check Resend dashboard for green checkmark ✅
- Once verified, you can send emails to ANY email address!

### 6. Restart Your Development Server

```bash
# Stop current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### 7. Test Email Sending

1. Make a test purchase with a **different email address** (not your own)
2. Check if the customer receives the email
3. Check spam folder if not in inbox
4. Check Resend logs: https://resend.com/logs

---

## ✅ Verification Checklist

- [ ] Domain `mindscraft.cc` added to Resend
- [ ] All DNS records added to domain registrar
- [ ] Green checkmark in Resend dashboard (domain verified)
- [ ] `.env.local` updated with `RESEND_FROM_EMAIL=MindsCraft <noreply@mindscraft.cc>`
- [ ] Vercel environment variable added (for production)
- [ ] Development server restarted
- [ ] Test purchase completed successfully
- [ ] Email received by customer (check spam folder)

---

## 🔧 Troubleshooting

### Domain not verifying after 30 minutes

**Check DNS propagation:**
```bash
# Check if DNS records are live
dig TXT mindscraft.cc
dig TXT resend._domainkey.mindscraft.cc
```

Or use online tools:
- https://dnschecker.org
- https://mxtoolbox.com/SuperTool.aspx

### Emails still not sending to customers

1. **Check Resend dashboard** - Is domain verified with green checkmark?
2. **Check .env.local** - Does it have the correct RESEND_FROM_EMAIL?
3. **Restart dev server** - Did you restart after changing .env.local?
4. **Check Resend logs** - https://resend.com/logs for error messages
5. **Check Vercel logs** - `vercel logs --follow` for webhook errors

### Common Issues

**Issue:** "Domain already exists"
- **Solution:** Domain might be claimed by another Resend account. Contact Resend support.

**Issue:** "SPF record conflicts"
- **Solution:** If you already have an SPF record, you need to merge them. Contact your domain registrar or Resend support.

**Issue:** Emails go to spam
- **Solution:** This is normal for new domains. Add DMARC record and wait for domain reputation to build.

---

## 🎯 Expected Result

After setup, when a customer completes a purchase:

1. ✅ Stripe webhook triggers
2. ✅ Email sends from `MindsCraft <noreply@mindscraft.cc>`
3. ✅ Customer receives email in their inbox
4. ✅ Email looks professional with your domain
5. ✅ No more "can only send to my email" restriction

---

## 📞 Need Help?

- **Resend Support:** https://resend.com/support
- **Resend Docs:** https://resend.com/docs/dashboard/domains/introduction
- **DNS Help:** Check with your domain registrar's support

---

**Domain:** mindscraft.cc  
**Recommended Email:** noreply@mindscraft.cc  
**Date:** January 22, 2026

