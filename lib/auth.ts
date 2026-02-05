import { Pool } from '@neondatabase/serverless';
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
