import Heading from "@/components/Heading";
import PageWrapper from "@/components/PageWrapper";

export const metadata = {
  title: "Expenses",
  description: "Manage expenses for a specific category",
};

export default function ExpensesByCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        //TODO: sx={{ mb: 5 }}
      />
      {children}
    </PageWrapper>
  );
}
