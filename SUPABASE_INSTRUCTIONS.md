# Supabase Setup for Persistent Storage

To fix the issue where projects are not saving in your deployed app, we have switched to using Supabase as the database. This ensures your data is stored permanently and not lost when the deployment updates.

## 1. Get Your Supabase Credentials

1.  Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Select your project (or create a new one).
3.  Go to **Settings** (cog icon) -> **API**.
4.  Copy the **Project URL**.
5.  Copy the **anon public** key.

## 2. Configure Environment Variables

### For Vercel (Deployment)
1.  Go to your project in the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Navigate to **Settings** -> **Environment Variables**.
3.  Add the following variables:
    *   **Key:** `NEXT_PUBLIC_SUPABASE_URL`
    *   **Value:** (Your Project URL)
    *   **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   **Value:** (Your anon public key)
4.  **Redeploy** your application for the changes to take effect.

### For Local Development
1.  Create a file named `.env.local` in the root of your project (if it doesn't exist).
2.  Add the credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
    ```

## 3. Database Setup (If not done yet)

1.  Go to the **SQL Editor** in your Supabase Dashboard.
2.  Copy the content of `SUPABASE_SETUP.sql` from your project files.
3.  Paste it into the SQL Editor and click **Run**.
    *   This creates the `projects` table and sets up the necessary security policies.

## Verification

Once deployed with the environment variables:
1.  Go to your admin panel.
2.  Add a new project.
3.  Refresh the page. The project should persist.
