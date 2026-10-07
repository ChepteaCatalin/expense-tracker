"use client";

import { Moon, Sun, LaptopMinimal } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "cn";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const btnClass = (btnTheme: string) =>
    cn(
      theme === btnTheme &&
        "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80",
    );

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Theme</span>
      {mounted ? (
        <ButtonGroup>
          <Button
            variant="outline"
            className={btnClass("system")}
            onClick={() => setTheme("system")}
          >
            <LaptopMinimal data-icon="inline-start" /> System
          </Button>
          <Button
            variant="outline"
            className={btnClass("light")}
            onClick={() => setTheme("light")}
          >
            <Sun data-icon="inline-start" /> Light
          </Button>
          <Button
            variant="outline"
            className={btnClass("dark")}
            onClick={() => setTheme("dark")}
          >
            <Moon data-icon="inline-start" /> Dark
          </Button>
        </ButtonGroup>
      ) : (
        <Skeleton className="inline h-8 w-59.5" />
      )}
    </div>
  );
}
