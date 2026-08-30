import Heading from "@/components/Heading";
import PeriodsTabs from "@/components/transactions/PeriodsTabs";
import { Suspense } from "react";
import PeriodTabsFallback from "@/components/transactions/form/PeriodTabsFallback";
import PageWrapper from "@/components/PageWrapper";

export const metadata = {
  title: "Income",
  description: "Track and organize your income",
};

export default function IncomeCategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Suspense fallback={<PeriodTabsFallback />}>
        <PeriodsTabs type="incomes" />
      </Suspense>
      {children}
    </PageWrapper>
  );
}
