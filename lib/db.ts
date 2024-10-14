import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

const db = drizzle(sql, { schema, logger: true });

// await db.delete(schema.users);

export default db;

export type DrizzleClient = typeof db;
