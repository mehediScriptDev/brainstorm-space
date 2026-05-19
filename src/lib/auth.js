import { betterAuth } from "better-auth";

// NOTE: Configure a database adapter (Drizzle/Prisma/Mongo/etc.) for production.
// This minimal config enables email/password sign-up/sign-in. Set
// BETTER_AUTH_SECRET and BETTER_AUTH_URL in your environment.
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
  url: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  // Enable email/password authentication for now
  emailAndPassword: {
    enabled: true
  }
  ,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

export default auth;
