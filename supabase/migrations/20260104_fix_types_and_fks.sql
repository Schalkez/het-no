-- Change column types to UUID using explicit casting
-- Need to drop existing constraints first if they depend on these columns
ALTER TABLE groups DROP CONSTRAINT IF EXISTS groups_created_by_fkey;
ALTER TABLE group_members DROP CONSTRAINT IF EXISTS group_members_user_id_fkey;

-- Change types
ALTER TABLE groups 
  ALTER COLUMN owner_id TYPE UUID USING owner_id::uuid;

ALTER TABLE group_members 
  ALTER COLUMN user_id TYPE UUID USING user_id::uuid;

-- Add new FK constraints referencing auth.users
ALTER TABLE groups ADD CONSTRAINT groups_owner_id_fkey 
  FOREIGN KEY (owner_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

ALTER TABLE group_members ADD CONSTRAINT group_members_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;
