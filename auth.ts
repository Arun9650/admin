import { PrismaAdapter } from "@auth/prisma-adapter";
import {prismaAuth} from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismaAuth) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
