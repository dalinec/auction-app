import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { database } from '@/db/database';
import { accounts, sessions, users, verificationTokens } from './db/schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(database, {
    usersTable: users,
    accountsTable: accounts as any,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
});
