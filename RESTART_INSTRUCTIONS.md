# 🔄 Restart Vercel Dev Server

## The Issue
The API routes weren't being detected by Vercel dev. I've updated `vercel.json` to fix this.

## ✅ How to Restart

### Step 1: Stop the Current Server
In your terminal where `vercel dev` is running:
1. Press `Ctrl+C` to stop it

### Step 2: Restart Vercel Dev
```bash
cd /Users/chenjie/workspace/MindCraft
npx vercel dev --yes
```

### Step 3: Wait for It to Start
You'll see output like:
```
Vercel CLI 50.4.8
Retrieving project…
> Running Dev Command "npm run dev"
  ➜  Local:   http://localhost:3001/
```

### Step 4: Test the Payment
1. Open http://localhost:3001/
2. Add "The Second Brain OS" to cart
3. Proceed to checkout
4. It should now work! ✅

## What Was Fixed

Updated `vercel.json` to explicitly configure API routes:
```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "@vercel/node@3.0.7"
    }
  }
}
```

This tells Vercel dev to treat files in `/api` as serverless functions.

## If It Still Doesn't Work

Check the terminal output for any errors when you restart `vercel dev`.

