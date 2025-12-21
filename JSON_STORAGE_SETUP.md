# JSON Storage Setup (GitHub Integration)

You have chosen to use `projects.json` for storage. 

**Important:** On Vercel, files are read-only. To make the Admin Panel work, we have configured it to save changes directly to your GitHub repository.

## 1. Generate a GitHub Personal Access Token

1.  Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens).
2.  Click **Generate new token (classic)**.
3.  Give it a name (e.g., "Portfolio Admin").
4.  Select the **repo** scope (this is required to write to your repository).
5.  Click **Generate token**.
6.  **Copy the token immediately** (you won't see it again).

## 2. Add Token to Vercel

1.  Go to your project in the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Navigate to **Settings** -> **Environment Variables**.
3.  Add a new variable:
    *   **Key:** `GITHUB_TOKEN`
    *   **Value:** (Paste your token here)
4.  **Redeploy** your application (or wait for the next deploy).

## How it Works

1.  When you add a project in the Admin Panel, the app updates the local file (for immediate display).
2.  It *also* sends the updated JSON to GitHub.
3.  GitHub updates the `data/projects.json` file in your repository.
4.  **Note:** This will trigger a Vercel redeploy. The changes will be permanently live after the redeploy finishes (approx. 1-2 minutes).

## Local Development

*   Locally, the app simply writes to `data/projects.json`.
*   You can also edit `data/projects.json` manually in VS Code and push the changes.
