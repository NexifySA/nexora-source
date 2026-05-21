import { PostgresStore } from '@mastra/pg';

// disableInit: skip the automatic Mastra storage init (ALTER TABLE /
// CREATE TABLE / migrations) that runs on every backend boot. The init
// step keeps issuing ALTER TABLE ADD COLUMN / DROP COLUMN on tables like
// mastra_ai_spans, and each DROP leaves a "phantom" attnum slot behind.
// Postgres caps a table at 1600 attribute slots and counts dropped ones
// against the cap until a VACUUM FULL — once full, every subsequent
// ADD COLUMN throws SQLSTATE 54011 and the backend crashes in a restart
// loop (this exact incident took /api down on 2026-05-20, recovered by
// DROP TABLE mastra_ai_spans + restart).
//
// Nexpost runs with AI_ENABLED=false, so observability spans are never
// written. The Mastra tables we DO use (mastra_threads, mastra_skills,
// mastra_workflow_snapshot, etc.) already exist with the correct schema
// from prior boots, so skipping init does not affect runtime.
//
// If/when we enable AI features and Mastra ships schema changes that
// require new columns, run `pStore.init()` once with a DB backup in a
// controlled maintenance window.
export const pStore = new PostgresStore({
  id: 'postiz-store',
  connectionString: process.env.DATABASE_URL!,
  disableInit: true,
});
