import Heading from "@/components/Heading";
import PeriodsTabs from "@/components/transactions/PeriodsTabs";
import { Suspense } from "react";
import PeriodTabsFallback from "@/components/transactions/form/PeriodTabsFallback";
import PageWrapper from "@/components/PageWrapper";

export const metadata = {
  title: "Expenses",
  description: "Track and organize your spending",
};

export default function ExpenseCategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Suspense fallback={<PeriodTabsFallback />}>
        <PeriodsTabs type="expenses" />
      </Suspense>
      {children}
    </PageWrapper>
  );
}
