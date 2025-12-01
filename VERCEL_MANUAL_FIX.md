# Manual Vercel Configuration Fix

## The Problem
Your Next.js app is in the `app` subdirectory, but Vercel is looking in the root directory.

## Step-by-Step Fix (Do this in Vercel Dashboard)

### Step 1: Go to Vercel Dashboard
1. Open your browser and go to: https://vercel.com/dashboard
2. Log in if needed

### Step 2: Open Project Settings
1. Find and click on your project: **robert-njoroge-portfolio**
2. Click on **Settings** (in the top navigation)

### Step 3: Configure Root Directory
1. In the Settings page, look for **General** in the left sidebar
2. Scroll down to find the **Root Directory** section
3. Click the **Edit** button next to "Root Directory"
4. In the input field, type: `app`
5. Click **Save**

### Step 4: Redeploy
1. Go to the **Deployments** tab (top navigation)
2. Find your latest deployment
3. Click the three dots menu (...) on the right side
4. Click **Redeploy**
5. Confirm the redeployment

### Step 5: Wait and Verify
1. Wait 2-3 minutes for the deployment to complete
2. Visit your site: https://robert-njoroge-portfolio-site-ek3s8s3wl.vercel.app
3. The 404 error should be gone!

## Alternative: If Above Doesn't Work

If setting the Root Directory doesn't work, try this:

### Delete and Re-import the Project
1. In Vercel Dashboard, go to your project settings
2. Scroll to the bottom and find **Delete Project**
3. Delete the project
4. Click **Add New Project**
5. Import from GitHub: `CoderNjoro/robert-njoroge-portfolio`
6. **IMPORTANT**: Before clicking Deploy, set:
   - **Root Directory**: `app`
   - **Framework Preset**: Next.js (should auto-detect)
7. Click **Deploy**

## Screenshots to Help

When you're in Vercel Settings → General, you should see something like:

```
Root Directory
├─ Edit button
└─ Current: ./ (or empty)
    Change to: app
```

## Need Help?
If you're still stuck, share a screenshot of:
1. Your Vercel project settings page
2. The deployment logs (Deployments tab → click on latest deployment → View Function Logs)
