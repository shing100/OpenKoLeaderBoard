-- Create documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  parsed_content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Documents are viewable by owner" ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Documents are insertable by owner" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Documents are updatable by owner" ON documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Documents are deletable by owner" ON documents
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();