/* eslint-disable no-var */
import { PrismaClient as PrismaClient1 } from "../prisma/generated/auth-client";


declare global {
  // eslint-disable-next-line no-var
  var prisma1: PrismaClient1 | undefined;
}

// Singleton pattern for the first Prisma client (Database 1)
const prismaClientSingleton1 = (): PrismaClient1 => {
  return new PrismaClient1({
    datasources: { db: { url: process.env.DATABASE_URL_1 } },
  });
};

// Export clients, reusing them if already instantiated
export const prisma1 = global.prisma1 || prismaClientSingleton1();

// Prevent new instances in development mode
if (process.env.NODE_ENV !== "production") {
  global.prisma1 = prisma1;
}

// Export the client to be used with NextAuth (assuming prisma1 is for auth)
export const prismaAuth = prisma1;