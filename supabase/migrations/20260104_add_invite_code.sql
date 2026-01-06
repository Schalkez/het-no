-- Add invite_code to groups
ALTER TABLE groups ADD COLUMN IF NOT EXISTS invite_code TEXT;

-- Update existing groups with random codes (simple generation for migration)
UPDATE groups 
SET invite_code = substring(md5(random()::text || clock_timestamp()::text) from 1 for 10) 
WHERE invite_code IS NULL;

-- Add Unique index
CREATE UNIQUE INDEX IF NOT EXISTS idx_groups_invite_code ON groups(invite_code);

-- Make it NOT NULL after population
ALTER TABLE groups ALTER COLUMN invite_code SET NOT NULL;
