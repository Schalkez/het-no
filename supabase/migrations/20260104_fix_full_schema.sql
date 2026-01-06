-- Drop policies depending on owner_id/user_id
DROP POLICY IF EXISTS "Users can create groups" ON groups;
DROP POLICY IF EXISTS "Group owners can update their groups" ON groups;
DROP POLICY IF EXISTS "Group owners can delete their groups" ON groups;
DROP POLICY IF EXISTS "Users can view members of groups they belong to" ON group_members;
DROP POLICY IF EXISTS "Users can view groups they are members of" ON groups;
DROP POLICY IF EXISTS "Group owners can add members" ON group_members;
DROP POLICY IF EXISTS "Group owners can remove members" ON group_members;

-- Drop constraints
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

-- Recreate Policies with UUID comparison (remove ::text cast)

-- Groups Policies
CREATE POLICY "Users can view groups they are members of"
  ON groups FOR SELECT
  USING (
    id IN (
      SELECT group_id FROM group_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create groups"
  ON groups FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Group owners can update their groups"
  ON groups FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Group owners can delete their groups"
  ON groups FOR DELETE
  USING (owner_id = auth.uid());

-- Group Members Policies
CREATE POLICY "Users can view members of groups they belong to"
  ON group_members FOR SELECT
  USING (
    group_id IN (
      SELECT group_id FROM group_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Group owners can add members"
  ON group_members FOR INSERT
  WITH CHECK (
    group_id IN (
      SELECT id FROM groups WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Group owners can remove members"
  ON group_members FOR DELETE
  USING (
    group_id IN (
      SELECT id FROM groups WHERE owner_id = auth.uid()
    )
  );
