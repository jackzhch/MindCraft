# 🚀 Quick Start: Supabase Authentication

Your MindCraft app now has full authentication! Here's what was added and how to get started.

## ✅ What Was Added

### 1. **Authentication System**
- ✅ Sign up with email/password
- ✅ Sign in/Sign out
- ✅ User profiles
- ✅ Password reset
- ✅ Session management

### 2. **User Interface Components**
- ✅ `AuthModal` - Beautiful sign up/sign in modal
- ✅ `UserMenu` - Dropdown menu with user profile
- ✅ `PurchaseHistory` - View all purchases
- ✅ Updated `Navbar` with auth integration

### 3. **Database Integration**
- ✅ User profiles stored in Supabase
- ✅ Purchase history tracking
- ✅ Automatic linking of purchases to users
- ✅ Row Level Security (RLS) policies

### 4. **New Files Created**

```
MindCraft/
├── lib/
│   └── supabase.ts                 # Supabase client setup
├── contexts/
│   └── AuthContext.tsx             # Authentication context provider
├── components/
│   ├── AuthModal.tsx               # Sign up/Sign in modal
│   ├── UserMenu.tsx                # User dropdown menu
│   └── PurchaseHistory.tsx         # Purchase history view
├── supabase-schema.sql             # Database schema (run in Supabase)
├── SUPABASE_SETUP.md               # Complete setup guide
└── QUICK_START_AUTH.md             # This file!
```

## 🎯 How to Set It Up (5 Minutes)

### Step 1: Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Name it "mindcraft" and choose a password
4. Wait for setup to complete (~2 minutes)

### Step 2: Run Database Schema (1 min)

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy entire contents of `supabase-schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

### Step 3: Get API Keys (1 min)

1. Go to **Settings → API** in Supabase
2. Copy these three values:
   - **Project URL**
   - **anon public** key
   - **service_role** key (keep secret!)

### Step 4: Add to .env.local (1 min)

Create or update `.env.local`:

```bash
# Add these new lines (keep your existing Stripe/Resend keys)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### Step 5: Restart Dev Server

```bash
npm run dev
```

## 🎉 Try It Out!

1. **Sign Up**
   - Click "Sign In" in navigation
   - Click "Don't have an account? Sign up"
   - Enter email and password
   - You're in!

2. **Make a Test Purchase**
   - Add "The Second Brain OS" to cart ($1.00)
   - Checkout with card `4242 4242 4242 4242`
   - Complete purchase

3. **View Purchase History**
   - Click your profile picture in nav
   - Click "My Purchases"
   - See your purchase!

## 🔍 What Each Component Does

### `AuthContext`
Manages authentication state throughout the app:
- Current user
- Sign up/Sign in functions
- Session management
- Password reset

### `AuthModal`
The sign up/sign in form:
- Toggle between sign up and sign in
- Form validation
- Error handling
- Success messages

### `UserMenu`
User dropdown in navbar:
- Shows user initials/avatar
- Links to purchases and profile
- Sign out button

### `PurchaseHistory`
Displays all user purchases:
- Fetches from Supabase
- Shows purchase details
- Download buttons (ready for implementation)

### Webhook Integration
When someone completes a purchase:
1. Stripe sends webhook to your API
2. Webhook stores purchase in Supabase
3. Links to user account (if signed in)
4. Sends confirmation email

## 🎨 UI Features

- **Dark theme** matching your MindCraft aesthetic
- **Gradient buttons** (purple → indigo)
- **Smooth animations** for modals and menus
- **Mobile responsive** - works on all devices
- **Accessible** - keyboard navigation support

## 🔒 Security Features

### Row Level Security (RLS)
- Users can only see their own purchases
- Users can only edit their own profile
- Service role can insert purchases (for webhooks)

### Authentication
- Passwords hashed with bcrypt
- JWT session tokens
- Secure cookie handling
- CSRF protection

### Environment Variables
- `VITE_*` variables safe for frontend
- Service role key only on backend
- Never exposed in client code

## 📝 Optional: Email Confirmation

By default, users can sign up without email confirmation (faster for development).

**To enable email confirmation:**
1. Go to Supabase dashboard
2. **Authentication → Email Templates**
3. Enable "Confirm email"
4. Customize the email template if desired

Users will need to click the link in their email before signing in.

## 🚀 Deploy to Production

When deploying to Vercel, add these environment variables:

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Important:** Same keys work for both development and production!

## 🔧 Customize It

### Change Colors
Edit gradients in components:
- `from-purple-600 to-indigo-600` → your colors
- Update in: AuthModal, UserMenu, buttons

### Add Social Login
1. Go to Supabase **Authentication → Providers**
2. Enable Google, GitHub, etc.
3. Add buttons in `AuthModal.tsx`

### Add Profile Page
Create `components/ProfileSettings.tsx`:
- Edit full name
- Change avatar
- Update email
- Delete account

## 📚 Learn More

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Detailed setup guide
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## ❓ Troubleshooting

### "Invalid API key"
- Check `.env.local` has correct keys
- Restart dev server: `npm run dev`
- No extra spaces in keys

### Sign up doesn't work
- Check Supabase dashboard for errors
- Verify email settings
- Try disabling email confirmation

### Blank page after clicking confirmation email
**Quick fix:**
1. Go to Supabase **Authentication → URL Configuration**
2. Add redirect URL: `http://localhost:3000/auth-callback.html`
3. See [AUTH_REDIRECT_FIX.md](./AUTH_REDIRECT_FIX.md) for details

### Purchases not showing
- Check webhook logs in Vercel
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- Make sure user is signed in when purchasing

### User menu not showing
- Clear browser cache
- Check browser console for errors
- Verify `VITE_SUPABASE_URL` is set correctly

## 🎊 You're All Set!

Your MindCraft app now has:
- ✅ User authentication
- ✅ User profiles  
- ✅ Purchase tracking
- ✅ Secure database
- ✅ Beautiful UI

**Questions?** Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for more details!

