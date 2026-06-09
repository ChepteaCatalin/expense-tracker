import 'server-only';

import { sql } from '@/lib/neon';
import { authGuard } from '@/lib/auth-utils';
import type { TotalsMetrics } from '@/types/dashboard';

export const getDashboardTotals = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<TotalsMetrics> => {
      const result = await sql`
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
          ), 0) AS income,
          COALESCE((
            SELECT SUM(sd.amount)
            FROM savings_deposit sd
            JOIN savings_goal sg ON sd.savings_goal_id = sg.id
            WHERE sg.user_id = ${session.user.id}
              AND sd.date >= ${from}::date
              AND sd.date <= ${to}::date
          ), 0) AS savings
      `;

      const row = result[0];

      return {
        expenses: Number(row.expenses),
        income: Number(row.income),
        savings: Number(row.savings),
      };
    },
);
