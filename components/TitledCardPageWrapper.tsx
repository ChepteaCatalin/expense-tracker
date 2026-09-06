import Heading from "@/components/Heading";
import PageWrapper from "./PageWrapper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function TitledCardPageWrapper({
  title,
  subtitle,
  children,
  aboveCard,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  aboveCard?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Heading title={title} subtitle={subtitle} />
      {aboveCard}
      <Card>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </PageWrapper>
  );
}
