import PageWrapper from "@/components/PageWrapper";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Loan Details",
  description: "Payments and details for your loan",
};

export default function LoanDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Heading title={metadata.title} subtitle={metadata.description} />
      {children}
    </PageWrapper>
  );
}
