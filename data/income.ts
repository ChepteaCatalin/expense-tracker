import "server-only";

import { authGuard } from "@/lib/auth-utils";
import { userTag, withFallback } from "@/utils/cache";

interface TransactionRow {
  id: number;
  amount: number;
  category_id: number;
  date: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

interface CategoryTotalRow {
  category_id: number;
  name: string;
  icon: string;
  stroke_color: string;
  background_color: string;
  total_amount: string;
}

interface TransactionWithCategoryRow extends TransactionRow {
  name: string;
  icon: string;
  stroke_color: string;
  background_color: string;
}
import type {
  SortTransactionBy,
  TransactionsByDate,
  Transaction,
  TransactionCategory,
  TransactionInput,
  TransactionInputWithId,
} from "@/types/transaction";
import { sql } from "@/lib/neon";
import { cacheLife, cacheTag, updateTag } from "next/cache";

export const createIncome = authGuard(
  (session) =>
    async (income: TransactionInput): Promise<Transaction> => {
      const result = await sql<TransactionRow>`
        INSERT INTO income (
          amount,
          category_id,
          date,
          description,
          user_id
        )
        SELECT
          ${income.amount},
          c.id,
          ${income.date},
          ${income.description},
          ${session.user.id}
        FROM category c
        WHERE c.id = ${income.categoryId}
          AND c.user_id = ${session.user.id}
          AND c.type = 'income'
        RETURNING
          id,
          amount,
          category_id,
          to_char(date, 'YYYY-MM-DD') AS date,
          description,
          created_at,
          updated_at
      `;

      const createdIncome = result[0];

      if (!createdIncome) throw new Error("Failed to create income");

      const tag = userTag(session.user.id);
      updateTag(tag("incomes"));
      updateTag(tag("incomes/categories"));
      updateTag(tag(`incomes/category/${income.categoryId}`));

      return {
        id: createdIncome.id,
        amount: createdIncome.amount,
        categoryId: createdIncome.category_id,
        date: new Date(createdIncome.date),
        description: createdIncome.description,
        createdAt: new Date(createdIncome.created_at),
        updatedAt: new Date(createdIncome.updated_at),
      };
    },
);

export const getIncomeById = authGuard((session) =>
  withFallback(
    undefined,
    async (incomeId: number): Promise<Transaction | undefined> => {
      "use cache";
      cacheLife("max");
      cacheTag(userTag(session.user.id)(`incomes/id/${incomeId}`));

      const result = await sql<TransactionRow>`
          SELECT
            id,
            amount,
            category_id,
            to_char(date, 'YYYY-MM-DD') AS date,
            description,
            created_at,
            updated_at
          FROM income
          WHERE id = ${incomeId}
            AND user_id = ${session.user.id}
        `;

      const row = result[0];
      if (!row) return undefined;

      return {
        id: row.id,
        amount: row.amount,
        categoryId: row.category_id,
        date: new Date(row.date),
        description: row.description,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      };
    },
  ),
);

export const updateIncome = authGuard(
  (session) =>
    async (income: TransactionInputWithId): Promise<Transaction> => {
      const result = await sql<
        TransactionRow & { previous_category_id: number }
      >`
        UPDATE income i
        SET
          amount = ${income.amount},
          category_id = ${income.categoryId},
          date = ${income.date},
          description = ${income.description},
          updated_at = NOW()
        FROM income prev
        WHERE
          i.id = ${income.id}
          AND prev.id = i.id
          AND i.user_id = ${session.user.id}
          AND EXISTS (
            SELECT 1
            FROM category c
            WHERE c.id = ${income.categoryId}
              AND c.user_id = ${session.user.id}
              AND c.type = 'income'
          )
        RETURNING
          i.id,
          i.amount,
          i.category_id,
          to_char(i.date, 'YYYY-MM-DD') AS date,
          i.description,
          i.created_at,
          i.updated_at,
          prev.category_id AS previous_category_id
      `;

      const editedIncome = result[0];

      if (!editedIncome) throw new Error("Failed to edit income");

      const tag = userTag(session.user.id);
      updateTag(tag("incomes"));
      updateTag(tag("incomes/categories"));
      updateTag(tag(`incomes/category/${editedIncome.category_id}`));
      if (editedIncome.previous_category_id !== editedIncome.category_id) {
        updateTag(tag(`incomes/category/${editedIncome.previous_category_id}`));
      }
      updateTag(tag(`incomes/id/${income.id}`));

      return {
        id: editedIncome.id,
        amount: editedIncome.amount,
        categoryId: editedIncome.category_id,
        date: new Date(editedIncome.date),
        description: editedIncome.description,
        createdAt: new Date(editedIncome.created_at),
        updatedAt: new Date(editedIncome.updated_at),
      };
    },
);

export const deleteIncome = authGuard(
  (session) =>
    async (incomeId: number): Promise<{ id: number; categoryId: number }> => {
      const result = await sql<Pick<TransactionRow, "id" | "category_id">>`
        DELETE FROM income
        WHERE id = ${incomeId}
          AND user_id = ${session.user.id}
        RETURNING id, category_id
      `;

      const deletedIncome = result[0];

      if (!deletedIncome) throw new Error("Failed to delete income");

      const tag = userTag(session.user.id);
      updateTag(tag("incomes"));
      updateTag(tag("incomes/categories"));
      updateTag(tag(`incomes/category/${deletedIncome.category_id}`));
      updateTag(tag(`incomes/id/${incomeId}`));

      return { id: deletedIncome.id, categoryId: deletedIncome.category_id };
    },
);

export const getIncomeCategories = authGuard((session) =>
  withFallback(
    [],
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<TransactionCategory[]> => {
      "use cache";
      cacheLife("max");
      cacheTag(userTag(session.user.id)("incomes/categories"));

      const result = await sql<CategoryTotalRow>`
          SELECT
            c.id AS category_id,
            c.name,
            c.icon,
            c.stroke_color,
            c.background_color,
            SUM(i.amount) AS total_amount
          FROM income i
          JOIN category c ON i.category_id = c.id AND c.user_id = i.user_id
          WHERE i.user_id = ${session.user.id}
            AND i.date >= ${from}::date
            AND i.date <= ${to}::date
          GROUP BY c.id, c.name, c.icon, c.stroke_color, c.background_color
          ORDER BY total_amount DESC
        `;

      return result.map((row) => ({
        categoryId: row.category_id,
        name: row.name,
        icon: row.icon,
        strokeColor: row.stroke_color,
        backgroundColor: row.background_color,
        totalAmount: +row.total_amount,
      }));
    },
  ),
);

export const getIncomesByCategory = authGuard((session) =>
  withFallback(
    [],
    async ({
      categoryId,
      from,
      to,
      sortBy = "date",
    }: {
      categoryId: string;
      from: string;
      to: string;
      sortBy?: SortTransactionBy;
    }): Promise<TransactionsByDate[]> => {
      "use cache";
      cacheLife("max");
      cacheTag(userTag(session.user.id)(`incomes/category/${categoryId}`));

      const result = await sql<TransactionWithCategoryRow>`
          SELECT
            i.id,
            i.amount,
            i.category_id,
            c.name,
            to_char(i.date, 'YYYY-MM-DD') AS date,
            i.description,
            i.created_at,
            i.updated_at,
            c.icon,
            c.stroke_color,
            c.background_color
          FROM income i
          JOIN category c ON i.category_id = c.id AND c.user_id = i.user_id
          WHERE i.user_id = ${session.user.id}
            AND i.category_id = ${categoryId}
            AND i.date >= ${from}::date
            AND i.date <= ${to}::date
          ORDER BY i.date DESC, i.amount DESC
        `;

      const groupedByDate = Object.groupBy(result, (row) => row.date);

      const days = Object.entries(groupedByDate).flatMap(([date, rows]) => {
        const firstRow = rows?.[0];
        if (!rows || !firstRow) return [];

        const transactions = rows.map((row) => ({
          id: row.id,
          amount: +row.amount,
          categoryId: row.category_id,
          date: new Date(row.date),
          description: row.description,
          createdAt: new Date(row.created_at),
          updatedAt: new Date(row.updated_at),
        }));

        return [
          {
            date: new Date(date),
            transactions,
            categoryName: firstRow.name,
            icon: firstRow.icon,
            strokeColor: firstRow.stroke_color,
            backgroundColor: firstRow.background_color,
          },
        ];
      });

      if (sortBy === "amount") {
        days.sort(
          (a, b) =>
            getIncomesSum(b.transactions) - getIncomesSum(a.transactions),
        );
      } else {
        days.sort((a, b) => b.date.getTime() - a.date.getTime());
      }

      return days;
    },
  ),
);

export const getIncomeCategoryTotal = authGuard((session) =>
  withFallback(
    0,
    async ({
      categoryId,
      from,
      to,
    }: {
      categoryId: string;
      from: string;
      to: string;
    }): Promise<number> => {
      "use cache";
      cacheLife("max");
      cacheTag(userTag(session.user.id)(`incomes/category/${categoryId}`));

      const result = await sql<Pick<CategoryTotalRow, "total_amount">>`
          SELECT COALESCE(SUM(amount), 0) AS total_amount
          FROM income
          WHERE user_id = ${session.user.id}
            AND category_id = ${categoryId}
            AND date >= ${from}::date
            AND date <= ${to}::date
        `;

      return +(result[0]?.total_amount ?? 0);
    },
  ),
);

function getIncomesSum(incomes: Transaction[]): number {
  return incomes.reduce((sum, inc) => sum + inc.amount, 0);
}
