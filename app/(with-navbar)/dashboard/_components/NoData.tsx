import Link from "next/link";
import { Plus, SearchX } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import InsightCard from "./InsightCard";

export default function NoData({
  title,
  link,
  customLink,
}: {
  title: string;
  link?: { href: string; text: string };
  customLink?: React.ReactNode;
}) {
  return (
    <InsightCard title={title}>
      <div className="flex flex-col items-center">
        <SearchX className="text-muted-foreground/50 size-15" />
        <p>No data found for this insight</p>
        {link && (
          <Link
            href={link.href}
            className={cn(buttonVariants({ variant: "outline" }), "mt-3")}
          >
            <Plus /> {link.text}
          </Link>
        )}
        {customLink}
      </div>
    </InsightCard>
  );
}
