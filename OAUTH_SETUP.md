# 🔐 OAuth Setup Guide for MindCraft

This guide will help you set up Google, GitHub, and Facebook OAuth authentication for your MindCraft application.

## 📋 Prerequisites

- A Supabase project (you should have already created one)
- Access to your Supabase Dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)

## 🌐 OAuth Redirect URLs

Before setting up each provider, you'll need to know your redirect URLs:

- **Local Development**: `http://localhost:3000/pages/auth-callback.html`
- **Production**: `https://your-domain.vercel.app/pages/auth-callback.html`

---

## 🔵 1. Google OAuth Setup

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure the consent screen if you haven't already:
   - Select **External** for user type
   - Fill in the required fields (App name, User support email, Developer contact)
   - Add scopes: `email`, `profile`, `openid`
   - Save and continue

6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: `MindCraft`
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for local development)
     - `https://your-domain.vercel.app` (for production)
   - **Authorized redirect URIs**:
     - `https://wlboeezcbmguaqijhzmo.supabase.co/auth/v1/callback`
   - Click **Create**

7. Copy your **Client ID** and **Client Secret**

### Step 2: Configure in Supabase

1. Go to your Supabase Dashboard: [https://supabase.com/dashboard/project/wlboeezcbmguaqijhzmo/auth/providers](https://supabase.com/dashboard/project/wlboeezcbmguaqijhzmo/auth/providers)
2. Find **Google** in the list of providers
3. Toggle **Enable Sign in with Google** to ON
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

---

## ⚫ 2. GitHub OAuth Setup

### Step 1: Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: `MindCraft`
   - **Homepage URL**: `http://localhost:3000` (or your production URL)
   - **Authorization callback URL**: `https://wlboeezcbmguaqijhzmo.supabase.co/auth/v1/callback`
4. Click **Register application**
5. Copy your **Client ID**
6. Click **Generate a new client secret** and copy the secret

### Step 2: Configure in Supabase

1. Go to your Supabase Dashboard: [https://supabase.com/dashboard/project/wlboeezcbmguaqijhzmo/auth/providers](https://supabase.com/dashboard/project/wlboeezcbmguaqijhzmo/auth/providers)
2. Find **GitHub** in the list of providers
3. Toggle **Enable Sign in with GitHub** to ON
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

---

## 🔵 3. Facebook OAuth Setup

### Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Select **Consumer** as the app type
4. Fill in the app details and click **Create App**
5. In the dashboard, go to **Settings** → **Basic**
6. Copy your **App ID** and **App Secret**
7. Add your domain to **App Domains**: `localhost` and `your-domain.vercel.app`
8. Click **Add Platform** → **Website**
9. Set **Site URL**: `http://localhost:3000` (or your production URL)
10. Navigate to **Facebook Login** → **Settings**
11. Add **Valid OAuth Redirect URIs**:
    - `https://wlboeezcbmguaqijhzmo.supabase.co/auth/v1/callback`
12. Save changes

### Step 2: Configure in Supabase

1. Go to your Supabase Dashboard: [https://supabase.com/dashboard/project/wlboeezcbmguaqijhzmo/auth/providers](https://supabase.com/dashboard/project/wlboeezcbmguaqijhzmo/auth/providers)
2. Find **Facebook** in the list of providers
3. Toggle **Enable Sign in with Facebook** to ON
4. Paste your **Client ID** (App ID) and **Client Secret** (App Secret)
5. Click **Save**

---

## ⚙️ 4. Configure Supabase Redirect URLs

After setting up all OAuth providers, you need to configure where users will be redirected after authentication:

1. Go to: [https://supabase.com/dashboard/project/wlboeezcbmguaqijhzmo/auth/url-configuration](https://supabase.com/dashboard/project/wlboeezcbmguaqijhzmo/auth/url-configuration)
2. Under **Redirect URLs**, add:
   - `http://localhost:3000/pages/auth-callback.html`
   - `https://your-domain.vercel.app/pages/auth-callback.html` (replace with your actual domain)
3. Set **Site URL** to: `http://localhost:3000` (or your production URL)
4. Click **Save**

---

## 🧪 5. Testing OAuth Login

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your app: `http://localhost:3000`

3. Click **Sign In** and test each OAuth provider:
   - ✅ Click **Continue with Google**
   - ✅ Click **Continue with GitHub**
   - ✅ Click **Continue with Facebook**

4. After successful authentication, you should be redirected back to your app and logged in!

---

## 🔒 Security Notes

1. **Never commit OAuth credentials** to your repository
2. **Use environment variables** for sensitive data (though Supabase handles this for you)
3. **Enable email verification** if you want to verify OAuth users
4. **Set up proper scopes** to only request necessary user data

---

## 🐛 Troubleshooting

### "Redirect URI mismatch" Error

**Problem**: OAuth provider shows an error about redirect URI mismatch.

**Solution**: Make sure the redirect URI in your OAuth provider settings EXACTLY matches:
```
https://wlboeezcbmguaqijhzmo.supabase.co/auth/v1/callback
```

### "Invalid OAuth Redirect URL" in Supabase

**Problem**: Supabase shows an error about invalid redirect URL.

**Solution**: 
1. Go to [Supabase URL Configuration](https://supabase.com/dashboard/project/wlboeezcbmguaqijhzmo/auth/url-configuration)
2. Add your callback URL: `http://localhost:3000/pages/auth-callback.html`
3. Make sure `pages/auth-callback.html` exists in your project

### OAuth Popup Blocked

**Problem**: OAuth popup is blocked by browser.

**Solution**: 
- Allow popups for your site in browser settings
- OAuth will open in a new tab instead if popups are blocked

### "User already registered" Error

**Problem**: User tries to sign up with OAuth but email already exists.

**Solution**: This is expected behavior. Users should use the same OAuth provider they originally signed up with, or use the "Sign In" option.

---

## ✅ What's Working Now

After completing this setup, users can:

- ✅ Sign in with Google (one click)
- ✅ Sign in with GitHub (one click)
- ✅ Sign in with Facebook (one click)
- ✅ Sign in with Email/Password (traditional)
- ✅ All authentication methods work seamlessly together
- ✅ User profiles are automatically created for OAuth users
- ✅ Purchase history is tracked for all authentication methods

---

## 🎉 Next Steps

Your OAuth authentication is now fully configured! Users can sign in with their preferred method, and all their purchases will be tracked automatically.

**Optional Enhancements:**
- Add more OAuth providers (Twitter, Discord, etc.)
- Customize the OAuth consent screen with your branding
- Add social profile pictures from OAuth providers
- Enable additional OAuth scopes for more user data

---

## 📚 Additional Resources

- [Supabase OAuth Documentation](https://supabase.com/docs/guides/auth/social-login)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps)
- [Facebook Login for the Web](https://developers.facebook.com/docs/facebook-login/web)

