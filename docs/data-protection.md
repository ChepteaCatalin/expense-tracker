# Data Protection Records

Internal accountability documentation for Expense Tracker, kept under Art. 5(2), Art. 30, and Art. 33(5) of the EU GDPR and of Moldovan Law No. 195/2024 on personal data protection (in force since 23 August 2026). The public-facing notice is the Privacy Policy at [`app/privacy/page.tsx`](../app/privacy/page.tsx). Keep both documents in sync.

## 1. Record of processing activities (Art. 30)

| Field                           | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Controller                      | Cătălin Cheptea — contact address listed in the Privacy Policy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Data Protection Officer         | Not appointed — not required (no large-scale systematic monitoring or special-category data, Art. 37)                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Purposes                        | (1) Providing the expense-tracking service; (2) account security and abuse prevention; (3) handling data subject requests                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Legal bases                     | (1) Art. 6(1)(b) contract; (2) Art. 6(1)(f) legitimate interests; (3) Art. 6(1)(c) legal obligation                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Data subjects                   | Registered users of the app                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Personal data categories        | `user`: name, email, email-verified flag, profile picture URL (Google), currency. `account`: provider ID, provider account ID, password hash (email sign-up only); OAuth tokens are **not** stored. `session`: token, created/updated/expiry dates; IP address and user agent are **not** stored. `category`, `expense`, `income`, `savings_goal`, `savings_deposit`: user-entered financial data and free-text notes. `rate_limit`: HMAC-SHA256 hashes of IP / email / user ID with counters. `tz` cookie: time zone name (not stored server-side). |
| Special categories (Art. 9)     | None intended; users are told not to enter them in free-text fields                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Recipients / processors         | Vercel Inc. (hosting, US / global edge); Neon (PostgreSQL, AWS `eu-central-1`, Frankfurt). Google is an independent controller for "Sign in with Google".                                                                                                                                                                                                                                                                                                                                                                                            |
| Transfers outside Moldova / EEA | Vercel and Neon (US companies): EU Standard Contractual Clauses in their DPAs (Art. 46 GDPR / Art. 46 Law No. 195/2024), plus the EU-U.S. Data Privacy Framework for EEA users where the provider is certified. Moldova → EEA transfers need no authorisation (Art. 44 Law No. 195/2024).                                                                                                                                                                                                                                                            |
| Retention                       | Account and financial data: until account deletion (cascade delete; Neon restore history is 6 h). Sessions: 7 days; expired rows deleted daily by `/api/cron/cleanup`. Rate-limit rows: deleted after 24 h (daily cron and probabilistic pruning), and the user's rows on account deletion. Verification rows: deleted daily once expired. Vercel runtime logs: ≤ 1 day (Hobby/Pro). Privacy correspondence: ≤ 3 years.                                                                                                                              |
| Security measures (Art. 32)     | HTTPS + HSTS, strict CSP and security headers ([`next.config.ts`](../next.config.ts)); hashed passwords (better-auth); per-user row scoping in every query; rate limiting on auth endpoints ([`lib/auth-rate-limit.ts`](../lib/auth-rate-limit.ts)); keyed hashing of rate-limit identifiers; encryption at rest by Neon; no analytics or third-party scripts; better-auth telemetry disabled.                                                                                                                                                       |

### Processor checklist (Art. 28)

- [ ] Vercel DPA accepted (https://vercel.com/legal/dpa)
- [ ] Neon DPA accepted (https://neon.com/dpa)
- [ ] Neon project region stays in the EU (currently `aws-eu-central-1` for prod, preview, and dev)
- [ ] Google Cloud OAuth consent screen links to the Privacy Policy

## 2. Data subject requests (Art. 12–22)

| Right                            | How it is fulfilled                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Access / portability (15, 20)    | Self-service JSON export: `Settings → Privacy & Data → Export my Data` ([`data/export.ts`](../data/export.ts)) |
| Rectification (16)               | Records editable in-app; account details on request                                                            |
| Erasure (17)                     | Self-service: `Settings → Privacy & Data → Delete Account` (cascades to all tables + rate-limit rows)          |
| Restriction / objection (18, 21) | By email; handled manually                                                                                     |

Respond within **one month** (extendable by two months with notice to the user within the first month). Verify the requester's identity, preferably by replying to the account email address. Log every request (date, type, outcome, date answered) and keep the log for no more than 3 years.

## 3. Personal data breach procedure (Art. 33–34)

1. **Contain** — rotate the affected credentials (`BETTER_AUTH_SECRET`, `DATABASE_URL`, Google OAuth secret, `CRON_SECRET`) and revoke sessions (`DELETE FROM session`) if needed.
2. **Assess** — what data, how many users, and the likely risk to them.
3. **Notify the authority within 72 hours** of becoming aware of the breach, unless it is unlikely to result in a risk to individuals:
   - Moldova: National Center for Personal Data Protection — https://datepersonale.md, centru@datepersonale.md, 48 Serghei Lazo St., MD-2004 Chișinău.
   - EU/EEA users affected: the competent EU supervisory authority.
4. **Notify affected users** without undue delay if the breach is likely to result in a high risk (Art. 34).
5. **Document** every breach (facts, effects, remedial actions) below, even if it was not notifiable.

### Breach log

| Date | Description | Data / users affected | Notified authority? | Notified users? | Remedial action |
| ---- | ----------- | --------------------- | ------------------- | --------------- | --------------- |
|      |             |                       |                     |                 |                 |
