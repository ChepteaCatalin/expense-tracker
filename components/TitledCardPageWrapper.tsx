import Heading from "@/components/Heading";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PageWrapper from "./PageWrapper";

export default function TitledCardPageWrapper({
  title,
  subtitle,
  children,
  aboveCard,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  aboveCard?: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Heading title={title} subtitle={subtitle} />
      {aboveCard}
      <Card sx={{ borderRadius: "10px", pt: 1, px: 1 }}>
        <CardContent>{children}</CardContent>
      </Card>
    </PageWrapper>
  );
}
