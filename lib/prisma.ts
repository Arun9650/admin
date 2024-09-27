import { PrismaClient as PrismaAuthClient } from '../prisma/generated/auth-client'


declare global {
  var prismaAuth: PrismaAuthClient | undefined
}

export const prismaAuth = global.prismaAuth || new PrismaAuthClient({
  datasources: { db: { url: process.env.AUTH_DATABASE_URL } },
})


if (process.env.NODE_ENV !== 'production') {
  global.prismaAuth = prismaAuth
}