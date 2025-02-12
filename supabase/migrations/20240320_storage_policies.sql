-- Create extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  parsed_content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create storage bucket policies
DROP POLICY IF EXISTS "Public Access" ON storage.buckets;
CREATE POLICY "Public Access" ON storage.buckets
  FOR ALL USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects
  FOR ALL USING (true)
  WITH CHECK (true);

-- Create documents table policies
DROP POLICY IF EXISTS "Public Access" ON public.documents;
CREATE POLICY "Public Access" ON public.documents
  FOR ALL USING (true)
  WITH CHECK (true);