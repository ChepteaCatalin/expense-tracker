"use client";

import { Moon, Sun, LaptopMinimal } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="h-8" />;
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 inline-block text-sm font-medium">Theme</span>
      <Toggle
        variant="outline"
        pressed={theme === "system"}
        onPressedChange={() => setTheme("system")}
      >
        <LaptopMinimal />
        System
      </Toggle>
      <Toggle
        variant="outline"
        pressed={theme === "dark"}
        onPressedChange={() => setTheme("dark")}
      >
        <Moon />
        Dark
      </Toggle>
      <Toggle
        variant="outline"
        pressed={theme === "light"}
        onPressedChange={() => setTheme("light")}
      >
        <Sun />
        Light
      </Toggle>
    </div>
  );
}
