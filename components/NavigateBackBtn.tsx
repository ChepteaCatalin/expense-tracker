"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export default function NavigateBackBtn({
  pageName,
  fallbackHref = "/",
}: {
  pageName?: string;
  fallbackHref?: string;
}) {
  const router = useRouter();

  const navigateBack = () => {
    if (window.history.length > 2) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <Button variant="ghost" onClick={navigateBack} className="mb-1">
      <ChevronLeft data-icon="inline-start" />
      {pageName ? `Back to ${pageName}` : "Back"}
    </Button>
  );
}
