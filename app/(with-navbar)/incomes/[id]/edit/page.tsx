import { getSession } from "@/data/auth";
import Form from "@/components/transactions/form/Form";
import { getAllCategoriesByType } from "@/data/category";
import { validIdParam } from "@/utils/url";
import { notFound, redirect } from "next/navigation";
import type { Category } from "@/types/category";
import { type Transaction } from "@/types/transaction";
import { UnauthorizedError } from "@/utils/error";
import { getIncomeById } from "@/data/income";
import { deleteIncome, updateIncome } from "../../actions";

export default async function EditIncome({
  params,
}: PageProps<"/incomes/[id]/edit">) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  var categories: Category[] = [];
  var income: Transaction | undefined = undefined;
  var session: Awaited<ReturnType<typeof getSession>> = null;
  try {
    [categories, income, session] = await Promise.all([
      getAllCategoriesByType("income"),
      getIncomeById(+id),
      getSession(),
    ]);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    throw err;
  }
  if (!categories.length || !income) notFound();

  const currency = session?.user.currency;

  return (
    <Form
      key={income.updatedAt.toISOString()}
      type="income"
      transaction={income}
      currency={currency}
      categories={categories}
      updateAction={updateIncome}
      deleteAction={deleteIncome}
    />
  );
}
