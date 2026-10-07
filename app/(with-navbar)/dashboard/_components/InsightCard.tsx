import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InsightCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="h-full pt-0">
      <CardHeader className="border-b pt-2 [.border-b]:pb-2">
        <CardTitle>
          <h2 className="font-bold">{title}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
