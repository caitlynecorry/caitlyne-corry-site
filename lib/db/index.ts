import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Reuse one pool across dev hot reloads so connections aren't leaked.
const globalForDb = globalThis as unknown as { journalPool?: Pool };

export const pool =
  globalForDb.journalPool ??
  new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });

if (process.env.NODE_ENV !== "production") globalForDb.journalPool = pool;

export const db = drizzle(pool, { schema });
