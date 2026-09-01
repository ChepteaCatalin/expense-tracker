"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function BackToApp() {
  const router = useRouter();

  return <Button onClick={() => router.back()}>Back to the app</Button>;
}
