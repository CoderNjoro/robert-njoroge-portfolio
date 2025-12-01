# Deployment Guide (Vercel)

## ⚠️ Critical Storage Warning
You are currently using **local file storage** (`data/projects.json`) for projects and **browser storage** (`localStorage`) for profile/skills.
-   **On Vercel**: The `data/projects.json` file will be **read-only** or **reset** every time you deploy. You will lose new data added via the Admin panel.
-   **Recommendation**: For a production deployment on Vercel, you **MUST** use a database like Supabase.

## Prerequisites

1.  **Vercel Account**: [Sign up here](https://vercel.com/signup).
2.  **GitHub Repository**: Push this code to a GitHub repository.
3.  **Supabase Project** (Recommended for persistence):
    -   Create a project at [supabase.com](https://supabase.com).
    -   Create a table named `projects` with appropriate columns.

## Environment Variables
If you proceed with Supabase (recommended), add these to your Vercel Project Settings:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon/Public Key |

## Deployment Steps

1.  **Push to GitHub**:
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
    ```

2.  **Import to Vercel**:
    -   Go to Vercel Dashboard -> "Add New..." -> "Project".
    -   Select your GitHub repository.

3.  **Configure Project**:
    -   **Framework Preset**: Next.js (should be auto-detected).
    -   **Root Directory**: `app` (Since your Next.js app is inside the `app` folder).
    -   **Environment Variables**: Add the Supabase keys here.

4.  **Deploy**: Click "Deploy".

## Post-Deployment
-   If you stick with the current file-based setup, the Admin panel changes will **NOT** save permanently.
-   To fix this, you need to fully switch the `lib/db.ts` logic to use Supabase instead of the fallback file/local storage.
