# Expense Tracker

Next.js app for tracking my personal expenses, subscriptions, savings, and income.

## Running Locally

Install dependencies:

```bash
pnpm i
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

I deploy the project on [Vercel](vercel.com/).

## Database

I use the [Neon](https://neon.com/) integration in Vercel.

Run the `migrations/schema.sql` script against a fresh PostgreSQL database.

To generate a db dump, install PostgreSQL locally then use the `pg_dump --schema-only --no-owner --no-privileges --clean --if-exists "$DATABASE_URL" > migrations/schema.sql` command. **Remove the Neon security tokens (/restrict and /unrestrict)**.
