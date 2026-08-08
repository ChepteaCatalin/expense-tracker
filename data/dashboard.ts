import 'server-only';

import { sql } from '@/lib/neon';
import { authGuard } from '@/lib/auth-utils';
import { cacheLife, cacheTag } from 'next/cache';
import { userTag } from '@/utils/cache';
import type {
  BreakdownChartData,
  CategoryBreakdown,
  CategoryTreemapNode,
  MonthlyMetric,
  SavingsChartData,
  TotalsMetrics,
} from '@/types/dashboard';

export const getTotals = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<TotalsMetrics> => {
      'use cache';
      cacheLife('max');
      const tag = userTag(session.user.id);
      cacheTag(tag('expenses'), tag('incomes'), tag('savings'));

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
          SELECT currency, SUM(amount) AS total
          FROM (
            SELECT sg.currency, sd.amount
            FROM savings_deposit sd
            JOIN savings_goal sg ON sd.savings_goal_id = sg.id
            WHERE sg.user_id = ${session.user.id}
              AND sd.date >= ${from}::date
              AND sd.date <= ${to}::date
            UNION ALL
            SELECT sg.currency, sg.initial_amount AS amount
            FROM savings_goal sg
            WHERE sg.user_id = ${session.user.id}
              AND sg.initial_amount > 0
              AND sg.start_date >= ${from}::date
              AND sg.start_date <= ${to}::date
          ) contributions
          GROUP BY currency
          ORDER BY currency
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
      'use cache';
      cacheLife('max');
      const tag = userTag(session.user.id);
      cacheTag(tag('expenses'), tag('incomes'));

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

export const getSavingsChartData = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<SavingsChartData> => {
      'use cache';
      cacheLife('max');
      cacheTag(userTag(session.user.id)('savings'));

      const rows = await sql`
        WITH months AS (
          SELECT generate_series(
            DATE_TRUNC('month', ${from}::date),
            DATE_TRUNC('month', ${to}::date),
            '1 month'::interval
          ) AS month
        ),
        contributions AS (
          SELECT
            DATE_TRUNC('month', sd.date) AS month,
            sg.currency,
            sd.amount
          FROM savings_deposit sd
          JOIN savings_goal sg ON sg.id = sd.savings_goal_id
          WHERE sg.user_id = ${session.user.id}
            AND sd.date >= ${from}::date
            AND sd.date <= ${to}::date
          UNION ALL
          SELECT
            DATE_TRUNC('month', sg.start_date) AS month,
            sg.currency,
            sg.initial_amount AS amount
          FROM savings_goal sg
          WHERE sg.user_id = ${session.user.id}
            AND sg.initial_amount > 0
            AND sg.start_date >= ${from}::date
            AND sg.start_date <= ${to}::date
        ),
        currencies AS (
          SELECT DISTINCT currency
          FROM contributions
        ),
        savings AS (
          SELECT month, currency, SUM(amount) AS total
          FROM contributions
          GROUP BY month, currency
        )
        SELECT
          TO_CHAR(months.month, 'Mon YYYY') AS month,
          currencies.currency,
          COALESCE(savings.total, 0) / 100.0 AS total
        FROM months
        CROSS JOIN currencies
        LEFT JOIN savings
          ON savings.month = months.month
          AND savings.currency = currencies.currency
        ORDER BY currencies.currency, months.month
      `;

      const months = Array.from(new Set(rows.map(row => row.month as string)));
      const seriesMap = new Map<string, number[]>();

      for (const row of rows) {
        const currency = row.currency as string;
        if (!seriesMap.has(currency)) {
          seriesMap.set(currency, []);
        }
        seriesMap.get(currency)!.push(+row.total);
      }

      return {
        months,
        series: Array.from(seriesMap.entries()).map(([currency, data]) => ({
          currency,
          data,
        })),
      };
    },
);

export const getExpenseCategoryBreakdown = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<BreakdownChartData> => {
      'use cache';
      cacheLife('max');
      cacheTag(userTag(session.user.id)('expenses'));

      const rows = await sql`
        WITH category_totals AS (
          SELECT category_id, SUM(amount) AS period_total
          FROM expense
          WHERE user_id = ${session.user.id}
            AND date >= ${from}::date
            AND date <= ${to}::date
          GROUP BY category_id
        )
        SELECT
          c.id AS category_id,
          c.name AS category_name,
          c.background_color AS background_color,
          TO_CHAR(months.month, 'Mon YYYY') AS month,
          COALESCE(SUM(e.amount), 0) / 100.0 AS total
        FROM (
          SELECT generate_series(
            DATE_TRUNC('month', ${from}::date),
            DATE_TRUNC('month', ${to}::date),
            '1 month'::interval
          ) AS month
        ) months
        CROSS JOIN (
          SELECT c.id, c.name, c.background_color, ct.period_total
          FROM category c
          JOIN category_totals ct ON ct.category_id = c.id
          WHERE c.user_id = ${session.user.id}
            AND c.type = 'expense'
        ) c
        LEFT JOIN expense e
          ON e.category_id = c.id
          AND e.user_id = ${session.user.id}
          AND e.date >= months.month::date
          AND e.date < (months.month + '1 month'::interval)::date
          AND e.date >= ${from}::date
          AND e.date <= ${to}::date
        GROUP BY c.id, c.name, c.background_color, c.period_total, months.month
        ORDER BY months.month, c.period_total DESC, LOWER(c.name)
      `;

      const months: string[] = [];
      const categoryMap = new Map<number, CategoryBreakdown>();

      for (const r of rows) {
        const month = r.month as string;
        if (months[months.length - 1] !== month) months.push(month);

        const id = +r.category_id;
        if (!categoryMap.has(id)) {
          categoryMap.set(id, {
            categoryId: id,
            categoryName: r.category_name as string,
            backgroundColor: r.background_color as string,
            data: [],
          });
        }
        categoryMap.get(id)!.data.push(+r.total);
      }

      return { months, categories: Array.from(categoryMap.values()) };
    },
);

export const getIncomeCategoryBreakdown = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<BreakdownChartData> => {
      'use cache';
      cacheLife('max');
      cacheTag(userTag(session.user.id)('incomes'));

      const rows = await sql`
        WITH category_totals AS (
          SELECT category_id, SUM(amount) AS period_total
          FROM income
          WHERE user_id = ${session.user.id}
            AND date >= ${from}::date
            AND date <= ${to}::date
          GROUP BY category_id
        )
        SELECT
          c.id AS category_id,
          c.name AS category_name,
          c.background_color AS background_color,
          TO_CHAR(months.month, 'Mon YYYY') AS month,
          COALESCE(SUM(i.amount), 0) / 100.0 AS total
        FROM (
          SELECT generate_series(
            DATE_TRUNC('month', ${from}::date),
            DATE_TRUNC('month', ${to}::date),
            '1 month'::interval
          ) AS month
        ) months
        CROSS JOIN (
          SELECT c.id, c.name, c.background_color, ct.period_total
          FROM category c
          JOIN category_totals ct ON ct.category_id = c.id
          WHERE c.user_id = ${session.user.id}
            AND c.type = 'income'
        ) c
        LEFT JOIN income i
          ON i.category_id = c.id
          AND i.user_id = ${session.user.id}
          AND i.date >= months.month::date
          AND i.date < (months.month + '1 month'::interval)::date
          AND i.date >= ${from}::date
          AND i.date <= ${to}::date
        GROUP BY c.id, c.name, c.background_color, c.period_total, months.month
        ORDER BY months.month, c.period_total DESC, LOWER(c.name)
      `;

      const months: string[] = [];
      const categoryMap = new Map<number, CategoryBreakdown>();

      for (const r of rows) {
        const month = r.month as string;
        if (months[months.length - 1] !== month) months.push(month);

        const id = +r.category_id;
        if (!categoryMap.has(id)) {
          categoryMap.set(id, {
            categoryId: id,
            categoryName: r.category_name as string,
            backgroundColor: r.background_color as string,
            data: [],
          });
        }
        categoryMap.get(id)!.data.push(+r.total);
      }

      return { months, categories: Array.from(categoryMap.values()) };
    },
);

export const getExpenseCategoryTreemapData = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<CategoryTreemapNode[]> => {
      'use cache';
      cacheLife('max');
      cacheTag(userTag(session.user.id)('expenses'));

      const rows = await sql`
        SELECT
          c.id AS category_id,
          c.name AS category_name,
          c.background_color AS background_color,
          SUM(e.amount) / 100.0 AS total
        FROM expense e
        JOIN category c ON c.id = e.category_id
        WHERE e.user_id = ${session.user.id}
          AND c.user_id = ${session.user.id}
          AND c.type = 'expense'
          AND e.date >= ${from}::date
          AND e.date <= ${to}::date
        GROUP BY c.id, c.name, c.background_color
        ORDER BY SUM(e.amount) DESC, LOWER(c.name)
      `;

      return rows.map(row => ({
        categoryId: +row.category_id,
        categoryName: row.category_name as string,
        backgroundColor: row.background_color as string,
        value: +row.total,
      }));
    },
);

export const getIncomeCategoryTreemapData = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<CategoryTreemapNode[]> => {
      'use cache';
      cacheLife('max');
      cacheTag(userTag(session.user.id)('incomes'));

      const rows = await sql`
        SELECT
          c.id AS category_id,
          c.name AS category_name,
          c.background_color AS background_color,
          SUM(i.amount) / 100.0 AS total
        FROM income i
        JOIN category c ON c.id = i.category_id
        WHERE i.user_id = ${session.user.id}
          AND c.user_id = ${session.user.id}
          AND c.type = 'income'
          AND i.date >= ${from}::date
          AND i.date <= ${to}::date
        GROUP BY c.id, c.name, c.background_color
        ORDER BY SUM(i.amount) DESC, LOWER(c.name)
      `;

      return rows.map(row => ({
        categoryId: +row.category_id,
        categoryName: row.category_name as string,
        backgroundColor: row.background_color as string,
        value: +row.total,
      }));
    },
);
