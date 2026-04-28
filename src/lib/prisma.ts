import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: Pool | undefined;
};

function getPgConnectionString() {
  // Prisma Postgres (prisma+postgres://...) is valid for Prisma, but NOT for node-postgres.
  // For the pg adapter we need a standard postgres:// connection string.
  const direct =
    process.env.PG_DATABASE_URL ||
    process.env.DIRECT_DATABASE_URL ||
    process.env.POSTGRES_URL ||
    "";

  if (direct.startsWith("postgres://") || direct.startsWith("postgresql://")) {
    return direct;
  }

  const fromDatabaseUrl = process.env.DATABASE_URL || "";
  if (
    fromDatabaseUrl.startsWith("postgres://") ||
    fromDatabaseUrl.startsWith("postgresql://")
  ) {
    return fromDatabaseUrl;
  }

  return "";
}

const pgConnectionString = getPgConnectionString();

const pool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString: pgConnectionString,
  });

const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (!process.env.DATABASE_URL) {
  // Prisma CLI uses prisma.config.ts + DATABASE_URL (can be prisma+postgres://...).
  throw new Error(
    "DATABASE_URL est manquant. Crée un fichier .env à la racine avec DATABASE_URL=postgresql://...",
  );
}

if (!pgConnectionString) {
  throw new Error(
    "Connexion Postgres manquante pour l'adapter PG. Ajoute PG_DATABASE_URL=postgres://... dans .env (ex: celui affiché par `npx prisma dev`).",
  );
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pgPool = pool;
}