# Fix: Empty Page After Email Confirmation

## The Problem
After clicking "Confirm your email" in the confirmation email, you see a blank page. However, you can still log in successfully.

## Why This Happens
The confirmation link works, but your app doesn't have a page configured to show after email confirmation.

## Quick Fix (5 minutes)

### Step 1: Configure Redirect URL in Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication → URL Configuration**
4. Under **Redirect URLs**, add:
   ```
   http://localhost:3000/auth-callback.html
   ```
5. If you've deployed to Vercel, also add your production URL:
   ```
   https://your-app.vercel.app/auth-callback.html
   ```
6. Click **Save**

### Step 2: Update Site URL (Optional)

While you're in **URL Configuration**, also set:
- **Site URL:** `http://localhost:3000` (for local development)

For production, change this to your Vercel URL.

### Step 3: Test It Out

1. Sign up with a new email address
2. Check your email inbox
3. Click "Confirm your email"
4. You should now see a nice confirmation page!
5. It will automatically redirect you to the homepage after 5 seconds

## Alternative: Disable Email Confirmation (Development Only)

If you don't want to deal with email confirmations during development:

1. Go to **Authentication → Providers**
2. Click on **Email**
3. Find **"Confirm email"** toggle
4. Turn it **OFF**

⚠️ **Remember to re-enable this for production!**

## What We Created

We added a beautiful confirmation page at `/pages/auth-callback.html` that shows:
- ✅ Success animation
- 🎉 Confirmation message
- ⏱️ Auto-redirect countdown
- 🔗 Manual "Go to MindCraft" button

## For Production (Vercel)

When you deploy to Vercel:

1. Update Supabase **Redirect URLs** with your Vercel domain:
   ```
   https://your-app.vercel.app/auth-callback.html
   ```

2. Update **Site URL**:
   ```
   https://your-app.vercel.app
   ```

3. The `pages/auth-callback.html` file will be automatically deployed by Vercel

## Troubleshooting

### Still seeing a blank page?
- Clear your browser cache
- Make sure you saved the Redirect URL in Supabase
- Check that the URL matches exactly (including the `/auth-callback.html` part)

### Email confirmation not working?
- Check your Supabase email logs: **Authentication → Logs**
- Verify your email provider is configured (or use Supabase's default)
- Check spam folder

### Want to customize the confirmation page?
Edit `/pages/auth-callback.html` - it's just HTML/CSS/JS!

---

**Questions?** Check the main [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) guide!

