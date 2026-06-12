import 'server-only';

import { sql } from '@/lib/neon';
import { authGuard } from '@/lib/auth-utils';
import type { MonthlyMetric, TotalsMetrics } from '@/types/dashboard';

export const getTotals = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<TotalsMetrics> => {
      const [totalsResult, savingsResult] = await Promise.all([
        sql`
          SELECT
            COALESCE((
              SELECT SUM(e.amount)
              FROM expense e
              WHERE e.user_id = ${session.user.id}
                AND e.date >= ${from}::date
                AND e.date <= ${to}::date
            ), 0) AS expenses,
            COALESCE((
              SELECT SUM(i.amount)
              FROM income i
              WHERE i.user_id = ${session.user.id}
                AND i.date >= ${from}::date
                AND i.date <= ${to}::date
            ), 0) AS income
        `,
        sql`
          SELECT sg.currency, SUM(sd.amount) AS total
          FROM savings_deposit sd
          JOIN savings_goal sg ON sd.savings_goal_id = sg.id
          WHERE sg.user_id = ${session.user.id}
            AND sd.date >= ${from}::date
            AND sd.date <= ${to}::date
          GROUP BY sg.currency
          ORDER BY sg.currency
        `,
      ]);

      const row = totalsResult[0];

      return {
        expenses: +row.expenses,
        income: +row.income,
        savingsByCurrency: savingsResult.map(r => ({
          currency: r.currency as string,
          total: +r.total,
        })),
      };
    },
);

export const getMonthlyMetrics = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<MonthlyMetric[]> => {
      const rows = await sql`
        SELECT
          TO_CHAR(months.month, 'Mon YYYY') AS month,
          COALESCE(i.total, 0) AS income,
          COALESCE(e.total, 0) AS expenses
        FROM (
          SELECT generate_series(
            DATE_TRUNC('month', ${from}::date),
            DATE_TRUNC('month', ${to}::date),
            '1 month'::interval
          ) AS month
        ) months
        LEFT JOIN (
          SELECT DATE_TRUNC('month', date) AS month, SUM(amount) AS total
          FROM income
          WHERE user_id = ${session.user.id}
            AND date >= ${from}::date
            AND date <= ${to}::date
          GROUP BY DATE_TRUNC('month', date)
        ) i ON i.month = months.month
        LEFT JOIN (
          SELECT DATE_TRUNC('month', date) AS month, SUM(amount) AS total
          FROM expense
          WHERE user_id = ${session.user.id}
            AND date >= ${from}::date
            AND date <= ${to}::date
          GROUP BY DATE_TRUNC('month', date)
        ) e ON e.month = months.month
        ORDER BY months.month
      `;

      return rows.map(r => ({
        month: r.month as string,
        income: +r.income,
        expenses: +r.expenses,
        netIncome: +r.income - +r.expenses,
      }));
    },
);
