import PageWrapper from "@/components/PageWrapper";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Goal Details",
  description: "Progress and details for your savings goal",
};

export default function SavingsGoalDetailsLayout({
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
