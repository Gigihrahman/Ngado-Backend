import { execSync } from "child_process";
import "reflect-metadata";
import { PrismaService } from "../src/modules/prisma/prisma.service";

const prisma = new PrismaService();

if (process.env.TEST_TYPE === "integration") {
  beforeAll(() => {
    execSync("npx prisma db push --force-reset");
  });

  beforeEach(async () => {
    /* ref: https://www.prisma.io/docs/orm/prisma-client/queries/crud#deleting-all-data-with-raw-sql--truncate */
    const tablenames = await prisma.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== "_prisma_migrations")
      .map((name) => `"public"."${name}"`)
      .join(", ");

    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
}
