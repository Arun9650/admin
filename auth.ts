import { PrismaAdapter } from "@auth/prisma-adapter";
import {prismaAuth} from "./lib/prisma";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismaAuth as any) ,
  session: { strategy: "jwt" },
  ...authConfig,
});
