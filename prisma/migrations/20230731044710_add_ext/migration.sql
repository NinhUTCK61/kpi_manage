-- This is an empty migration.
CREATE EXTENSION IF NOT EXISTS pg_bigm;

CREATE INDEX template_name_idx ON "Template" USING gin (name gin_bigm_ops);