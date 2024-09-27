import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "./lib/form-schemas";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import {prismaAuth} from "./lib/prisma";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate the fields
        const validatedFields = signInSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        // Validate that the user exists
        const { email, password } = validatedFields.data;
        const user = await prismaAuth.user.findUnique({
          where: { email },
        });
        console.log(user);
        if (!user) {
          return null;
        }

        // Check the password
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
