# Expense Tracker

Next.js app for tracking personal expenses, savings, and income.

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

To generate a db dump, install PostgreSQL locally then use the `pg_dump --schema-only --no-owner --no-privileges --clean --if-exists "$DATABASE_URL" > migrations/schema.sql` command.

## Data Retention Cron

`vercel.json` schedules a daily call to `/api/cron/cleanup`, which deletes expired sessions, expired verification tokens, and stale rate-limit counters, as promised in the Privacy Policy. Set a `CRON_SECRET` environment variable (a random string of at least 16 characters) in Vercel; the endpoint rejects requests without it.

## Privacy Policy

The app is designed to comply with the EU GDPR and Moldovan Law No. 195/2024 on personal data protection. The internal record of processing activities and the breach procedure are in [docs/data-protection.md](docs/data-protection.md).

If you decide to self-host this app, please don't forget to update the Privacy Policy and the data protection records. At a minimum, make sure to update the contact information, the hosting providers, and the database region.
