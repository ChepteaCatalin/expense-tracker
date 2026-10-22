import Fab from "@/components/Fab";
import Link from "next/link";
import LoanCard from "./_components/LoanCard";
import Heading from "@/components/Heading";
import { getAllLoans } from "@/data/loans";
import { UnauthorizedError } from "@/utils/error";
import { redirect } from "next/navigation";
import type { Loan } from "@/types/loans";
import NoLoans from "./_components/NoLoans";
import { metadata } from "./constants";
import PageWrapper from "@/components/PageWrapper";

export { metadata };

export default async function LoansPage() {
  let loans: Loan[] = [];
  try {
    loans = await getAllLoans();
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
  }

  return (
    <PageWrapper>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <div className="flex flex-col gap-6">
        {loans.length ? (
          loans.map((loan) => (
            <Link
              key={loan.id}
              href={`/loans/${loan.id}/details`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <LoanCard loan={loan} />
            </Link>
          ))
        ) : (
          <NoLoans />
        )}
        <Link href="/loans/new">
          <Fab />
        </Link>
      </div>
    </PageWrapper>
  );
}
