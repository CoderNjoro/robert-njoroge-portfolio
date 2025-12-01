# Vercel Deployment Fix Guide

## Problem
You're getting a 404 NOT_FOUND error because your Next.js app is in the `app` subdirectory, not the root.

## Solution

### Option 1: Using vercel.json (Recommended)
I've created a `vercel.json` file in your root directory. Now you need to:

1. **Commit and push the changes:**
   ```bash
   git add vercel.json
   git commit -m "Add Vercel configuration for subdirectory deployment"
   git push origin main
   ```

2. **Redeploy on Vercel:**
   - Go to your Vercel dashboard
   - Your project should automatically redeploy with the new configuration
   - If not, click "Redeploy" on your latest deployment

### Option 2: Configure in Vercel Dashboard (Alternative)
If Option 1 doesn't work, configure directly in Vercel:

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project: `robert-njoroge-portfolio`
3. Go to **Settings** → **General**
4. Find **Root Directory** section
5. Click **Edit** and set it to: `app`
6. Click **Save**
7. Go to **Deployments** tab
8. Click the three dots (...) on your latest deployment
9. Click **Redeploy**

### Option 3: Restructure Project (Clean Solution)
Move everything from the `app` subdirectory to the root:

```bash
# This would require moving all files from app/ to root
# Not recommended if you've already set up the current structure
```

## Verification
After redeploying, your site should load at:
https://robert-njoroge-portfolio-site-ek3s8s3wl.vercel.app

## Notes
- The `vercel.json` tells Vercel to run build commands in the `app` directory
- Make sure you have the Supabase environment variables set in Vercel if you're using a database
- The current setup uses file-based storage which won't persist on Vercel (see DEPLOY.md)

## Next Steps
1. Push the vercel.json file to GitHub
2. Wait for automatic redeploy or trigger manual redeploy
3. If you want persistent data, set up Supabase (see SUPABASE_SETUP.sql)
