-- Create chat_sessions table
create table chat_sessions (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create chat_messages table
create table chat_messages (
  id text primary key,
  session_id text references chat_sessions(id) on delete cascade not null,
  role text check (role in ('user', 'assistant', 'system')) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index chat_messages_session_id_idx on chat_messages(session_id);
create index chat_messages_created_at_idx on chat_messages(created_at);
