"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToApp() {
  const router = useRouter();

  return (
    <Button variant="outline" size="lg" onClick={() => router.back()}>
      <ArrowLeft data-icon="inline-start" />
      Back to the app
    </Button>
  );
}
