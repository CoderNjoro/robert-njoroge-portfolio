# Fresh Vercel Deployment Guide

## Step 1: Delete the Current Project

1. Go to https://vercel.com/dashboard
2. Click on your project: **robert-njoroge-portfolio**
3. Click **Settings** (top navigation)
4. Scroll all the way down to the **Danger Zone** section
5. Click **Delete Project**
6. Type the project name to confirm: `robert-njoroge-portfolio`
7. Click **Delete**

## Step 2: Create New Deployment

1. In Vercel Dashboard, click **Add New...** → **Project**
2. Click **Import Git Repository**
3. Find and select: **CoderNjoro/robert-njoroge-portfolio**
   - If you don't see it, click **Adjust GitHub App Permissions** to grant access

## Step 3: Configure Before Deploying (CRITICAL!)

Before clicking Deploy, configure these settings:

### **Root Directory** ⚠️ MOST IMPORTANT
- Click **Edit** next to "Root Directory"
- Enter: `app`
- This tells Vercel your Next.js app is in the `app` folder

### **Framework Preset**
- Should auto-detect as: **Next.js**
- If not, select it manually

### **Build and Output Settings** (Optional - usually auto-detected)
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install` (auto-detected)

### **Environment Variables** (Optional - for Supabase later)
Skip for now, or add if you have Supabase set up:
- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

## Step 4: Deploy

1. After setting **Root Directory** to `app`, click **Deploy**
2. Wait 2-3 minutes for the build to complete
3. You'll get a new URL (or you can set a custom domain)

## Step 5: Verify

1. Click on the deployment URL
2. Your portfolio should load correctly!
3. No more 404 errors 🎉

## Expected Result

You should see your portfolio with:
- Hero section with your profile
- Projects grid
- Skills section
- Contact section

## Troubleshooting

### If you still get 404:
1. Go to your project → Settings → General
2. Verify **Root Directory** is set to `app`
3. Go to Deployments → Redeploy

### If build fails:
1. Check the build logs
2. Make sure all dependencies are in `app/package.json`
3. Verify `app/next.config.ts` exists

## Notes

- Your new deployment URL might be different from the old one
- You can set up a custom domain in Settings → Domains
- Remember: File-based storage won't persist (see DEPLOY.md for Supabase setup)

## Quick Checklist

- [ ] Delete old project
- [ ] Import from GitHub
- [ ] Set Root Directory to `app` ⚠️
- [ ] Click Deploy
- [ ] Wait for deployment
- [ ] Test the URL
- [ ] Celebrate! 🎉
