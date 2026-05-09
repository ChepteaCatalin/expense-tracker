import { type TransactionCategory } from '@/types/transaction';

export function getCategoryPercentages(
  transactionCategories: TransactionCategory[],
) {
  const totalAmount = transactionCategories.reduce(
    (sum, c) => sum + c.totalAmount,
    0,
  );

  return transactionCategories.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.categoryId]:
        totalAmount === 0 ? 0 : (curr.totalAmount / totalAmount) * 100,
    }),
    {} as { [key: string]: number },
  );
}
