# Supabase Authentication & Database Setup Guide

This guide will help you set up Supabase authentication and database for MindCraft.

## 📋 Prerequisites

- A Supabase account (free tier works great!)
- Access to your Supabase project dashboard

## 🚀 Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New Project"**
3. Choose your organization (or create one)
4. Fill in the project details:
   - **Name:** `mindcraft` (or your preferred name)
   - **Database Password:** Choose a strong password (save this!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free tier is sufficient for getting started
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

## 🔑 Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings → API**
2. You'll need three values:

### Project URL
```
https://YOUR_PROJECT_REF.supabase.co
```

### Anon/Public Key (for frontend)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Service Role Key (for backend/webhooks)
⚠️ **IMPORTANT:** Keep this secret! Never expose in frontend code.
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🗄️ Step 3: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste it into the SQL editor
5. Click **"Run"** or press `Cmd/Ctrl + Enter`

This will create:
- ✅ `profiles` table (user profiles)
- ✅ `purchases` table (purchase history)
- ✅ Row Level Security (RLS) policies
- ✅ Automatic profile creation on signup
- ✅ Indexes for performance

## ⚙️ Step 4: Configure Authentication

1. In your Supabase dashboard, go to **Authentication → Providers**
2. Click on **Email** provider
3. Email authentication is **enabled by default**

### Email Confirmation Settings

By default, users need to confirm their email before signing in (recommended for production).

**To disable email confirmation (development only):**
1. Go to **Authentication → Providers**
2. Click on **Email**
3. Scroll down to find **"Confirm email"** toggle
4. Turn it **OFF** for faster testing

⚠️ **Important:** Re-enable email confirmation for production!

### Customize Email Templates (Optional)

To customize the signup, reset password, or other auth emails:
1. Go to **Authentication → Email Templates**
2. Select the template you want to edit (Confirm signup, Invite user, Magic Link, etc.)
3. Customize the subject and HTML content
4. Save changes

### Optional: Add Social Login
You can enable social authentication providers:
1. Go to **Authentication → Providers**
2. Scroll through available providers (Google, GitHub, Discord, Facebook, etc.)
3. Click on a provider and follow the setup instructions
4. Each provider requires you to create an OAuth app and provide credentials

## 🔐 Step 5: Update Environment Variables

Add these to your `.env.local` file:

```bash
# Existing Stripe & Resend keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_KEY
RESEND_API_KEY=re_YOUR_KEY
GEMINI_API_KEY=your_gemini_key

# NEW: Supabase (Frontend - starts with VITE_)
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# NEW: Supabase (Backend - for API routes/webhooks)
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### For Vercel Deployment

Add these in **Vercel Dashboard → Settings → Environment Variables:**

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🧪 Step 6: Test Authentication

1. Start your development server:
```bash
npm run dev
```

2. Open [http://localhost:5173](http://localhost:5173)
3. Click **"Sign In"** in the navigation
4. Click **"Don't have an account? Sign up"**
5. Enter your email and password
6. Check your email for confirmation (if enabled)
7. Sign in!

## 📊 Step 7: Verify Database

After signing up, check your Supabase dashboard:

1. Go to **Table Editor**
2. Select **profiles** table
3. You should see your new user profile!

After making a test purchase:
1. Select **purchases** table
2. You should see your purchase record!

## 🔍 Monitoring & Debugging

### View Authentication Logs
- **Authentication → Users:** See all registered users
- **Authentication → Logs:** Debug authentication issues

### Query Database
- **SQL Editor:** Run custom queries
- **Table Editor:** View and edit data directly

### Check Policies
- **Authentication → Policies:** Verify RLS policies are working

## 🚨 Troubleshooting

### "Invalid API key" Error
- ✅ Check that your `.env.local` file is in the project root
- ✅ Restart your development server after adding env variables
- ✅ Verify the keys are correct (no extra spaces)

### Blank Page After Email Confirmation
**Problem:** Clicking "Confirm your email" shows a blank page, but login still works.

**Solution:**
1. Go to **Authentication → URL Configuration** in Supabase
2. Add to **Redirect URLs**: `http://localhost:3000/auth-callback.html`
3. Set **Site URL**: `http://localhost:3000`
4. Save and try again!

📚 **See [AUTH_REDIRECT_FIX.md](./AUTH_REDIRECT_FIX.md) for detailed instructions**

### Email Not Sending
- ✅ Check **Authentication → Providers → Email** settings
- ✅ For development, consider disabling email confirmation
- ✅ Check spam folder
- ✅ View email logs: **Authentication → Logs**

### RLS Policy Errors
- ✅ Run the `supabase-schema.sql` again to ensure policies are created
- ✅ Check **Table Editor → RLS** to verify policies are enabled

### Purchases Not Showing
- ✅ Make sure webhook is properly configured
- ✅ Check Vercel function logs for errors
- ✅ Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel

## 🎯 What You Get

With Supabase Auth + Database, your MindCraft app now has:

✅ **User Authentication**
- Email/password signup and login
- Secure password hashing
- Session management
- Password reset functionality

✅ **User Profiles**
- Automatic profile creation on signup
- Store user metadata (name, avatar)
- Extensible for additional fields

✅ **Purchase History**
- Automatic recording of Stripe purchases
- Linked to user accounts
- Accessible in "My Purchases" page

✅ **Security**
- Row Level Security (RLS) policies
- Users can only see their own data
- Service role for backend operations

✅ **Scalability**
- Supabase handles millions of users
- Real-time subscriptions (if needed)
- Automatic backups

## 🔐 OAuth Authentication (Optional)

Want to allow users to sign in with Google, GitHub, or Facebook? Check out our **[OAuth Setup Guide](./OAUTH_SETUP.md)** for step-by-step instructions!

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Database](https://supabase.com/docs/guides/database)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [OAuth Setup Guide](./OAUTH_SETUP.md)

## 🔄 Next Steps

1. **Customize User Profiles:** Add more fields to the profiles table
2. **Add Social Login:** Enable Google, GitHub, Facebook (see [OAuth Setup Guide](./OAUTH_SETUP.md))
3. **Email Templates:** Customize the confirmation emails
4. **Advanced Features:** Add real-time features, storage, etc.

---

**Need Help?** Check the [Supabase Discord](https://discord.supabase.com) or [GitHub Issues](https://github.com/supabase/supabase/issues)

