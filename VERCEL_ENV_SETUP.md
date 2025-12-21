# Setting Up GITHUB_TOKEN in Vercel

## ⚠️ IMPORTANT SECURITY NOTE
Your GitHub token was exposed in this conversation. **Please regenerate it** after setting it up:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Revoke the current token
3. Create a new token with `repo` permissions
4. Update it in Vercel

## Steps to Add GITHUB_TOKEN to Vercel:

1. **Go to your Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your portfolio project

2. **Navigate to Settings**
   - Click on your project name
   - Go to the "Settings" tab
   - Click on "Environment Variables" in the left sidebar

3. **Add the Environment Variable**
   - Click "Add New"
   - **Name**: `GITHUB_TOKEN`
   - **Value**: `[Your GitHub Personal Access Token]` (paste your token here)
   - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

4. **Redeploy Your Application**
   - Go to the "Deployments" tab
   - Click the three dots (⋯) on your latest deployment
   - Select "Redeploy"
   - Or push a new commit to trigger a redeploy

5. **Test the Fix**
   - Go to https://robert-njoroge-portfolio.vercel.app/admin
   - Try adding a new project
   - You should see a success message if the token is working
   - If you see an error, check the Vercel function logs for details

## Local Development

For local development, the token is already set in `.env.local` (this file is gitignored).

To test locally:
```bash
npm run dev
```

Then visit http://localhost:3000/admin

## Troubleshooting

If projects still aren't saving:
1. Check Vercel function logs for errors
2. Verify the token has `repo` permissions in GitHub
3. Ensure the repository name matches: `CoderNjoro/Portfolio`
4. Check that the branch is `main`
5. Verify the file path is `data/projects.json`

