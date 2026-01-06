-- Fix Foreign Key constraints to reference auth.users instead of public.users

-- Fix groups table
ALTER TABLE groups DROP CONSTRAINT IF EXISTS groups_created_by_fkey;
ALTER TABLE groups ADD CONSTRAINT groups_owner_id_fkey 
  FOREIGN KEY (owner_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Fix group_members table
ALTER TABLE group_members DROP CONSTRAINT IF EXISTS group_members_user_id_fkey;
ALTER TABLE group_members ADD CONSTRAINT group_members_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;
