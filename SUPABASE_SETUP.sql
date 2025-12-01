-- Copy and paste this into the SQL Editor in your Supabase Dashboard

-- 1. Create the projects table
-- We use double quotes "createdAt" to match your TypeScript interface exactly (camelCase).
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('completed', 'underway', 'future')),
  year TEXT,
  "startDate" TEXT,
  "endDate" TEXT,
  progress INTEGER,
  images TEXT[] DEFAULT '{}'::TEXT[],
  video TEXT,
  tech TEXT[] DEFAULT '{}'::TEXT[],
  github TEXT,
  link TEXT,
  "createdAt" BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
);

-- 2. Enable Row Level Security (Security Best Practice)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Create Access Policies
-- Allow everyone to READ projects (needed for your main portfolio page)
CREATE POLICY "Enable read access for all users" 
ON public.projects FOR SELECT 
TO anon 
USING (true);

-- Allow everyone to WRITE projects (needed for your Admin panel)
-- Note: Since your app uses a simple frontend password, we allow the 'anon' key to write.
-- In a more advanced app, you would restrict this to authenticated users.
CREATE POLICY "Enable insert for all users" 
ON public.projects FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Enable update for all users" 
ON public.projects FOR UPDATE 
TO anon 
USING (true);

CREATE POLICY "Enable delete for all users" 
ON public.projects FOR DELETE 
TO anon 
USING (true);
