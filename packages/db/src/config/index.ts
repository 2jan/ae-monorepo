import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client, Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = new Client({
    connectionString: process.env.DATABASE_URL!,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({
    client: pool,
});

export async function runMigrations() {
    try {
        console.log("Running migrations...");
        const migrationDb = drizzle({
            client,
            casing: "snake_case",
        });
        await migrate(migrationDb, {
            migrationsFolder: "./drizzle",
        });

    } catch (error) {
        console.error("Migration failed:", error);
        throw(error);
    }
}