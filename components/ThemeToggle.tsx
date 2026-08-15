"use client";

import { Moon, Sun, LaptopMinimal } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="h-8" />;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Theme</span>
      <ButtonGroup>
        <Button
          variant="outline"
          className={cn(theme === "system" && selectedThemeClasses)}
          onClick={() => setTheme("system")}
        >
          <LaptopMinimal data-icon="inline-start" /> System
        </Button>
        <Button
          variant="outline"
          className={cn(theme === "dark" && selectedThemeClasses)}
          onClick={() => setTheme("dark")}
        >
          <Moon data-icon="inline-start" /> Dark
        </Button>
        <Button
          variant="outline"
          className={cn(theme === "light" && selectedThemeClasses)}
          onClick={() => setTheme("light")}
        >
          <Sun data-icon="inline-start" /> Light
        </Button>
      </ButtonGroup>
    </div>
  );
}

const selectedThemeClasses =
  "bg-primary dark:bg-primary hover:bg-primary/80 dark:hover:bg-primary/80";
