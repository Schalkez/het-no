-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add topic_id to services
ALTER TABLE services ADD COLUMN IF NOT EXISTS topic_id UUID REFERENCES topics(id) ON DELETE SET NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_topics_group_id ON topics(group_id);
CREATE INDEX IF NOT EXISTS idx_topics_created_by ON topics(created_by);
CREATE INDEX IF NOT EXISTS idx_services_topic_id ON services(topic_id);

-- RLS
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

-- Topics Policies
CREATE POLICY "Users can view topics of groups they belong to"
  ON topics FOR SELECT
  USING (
    group_id IN (
      SELECT group_id FROM group_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Group members can create topics"
  ON topics FOR INSERT
  WITH CHECK (
    group_id IN (
      SELECT group_id FROM group_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Group members can update topics"
  ON topics FOR UPDATE
  USING (
    group_id IN (
      SELECT group_id FROM group_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Group owners can delete topics"
  ON topics FOR DELETE
  USING (
    group_id IN (
      SELECT id FROM groups WHERE owner_id = auth.uid()
    )
  );
