import { useSyncExternalStore } from "react";

const tokens = {
  foreground: "--foreground",
  mutedForeground: "--muted-foreground",
  muted: "--muted",
  border: "--border",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  primaryLight: "--primary-light",
  destructive: "--destructive",
  chart1: "--chart-1",
  chart2: "--chart-2",
  chart3: "--chart-3",
  chart4: "--chart-4",
  chart5: "--chart-5",
} as const;

export type ThemeColors = Record<keyof typeof tokens, string>;

type ResolvedTheme = { dark: boolean; colors: ThemeColors };

// Shared across all chart instances so the (relatively expensive) style and
// canvas reads happen once per theme change instead of once per chart.
let cached: { htmlClass: string; theme: ResolvedTheme } | null = null;

function getResolvedTheme(htmlClass: string): ResolvedTheme {
  if (cached?.htmlClass !== htmlClass) {
    cached = {
      htmlClass,
      theme: {
        dark: htmlClass.split(" ").includes("dark"),
        colors: readThemeColors(),
      },
    };
  }
  return cached.theme;
}

/**
 * Resolves the app's CSS theme tokens to rgba() strings so they can be used
 * by canvas-based libraries (e.g. ECharts) that can't read CSS variables or
 * parse oklch(). Returns null until mounted on the client.
 */
export function useThemeColors() {
  const htmlClass = useSyncExternalStore(
    subscribe,
    () => document.documentElement.className,
    () => null,
  );

  return htmlClass === null ? null : getResolvedTheme(htmlClass);
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function readThemeColors(): ThemeColors {
  const styles = getComputedStyle(document.documentElement);
  const ctx = document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true })!;

  return Object.fromEntries(
    Object.entries(tokens).map(([key, variable]) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = styles.getPropertyValue(variable).trim();
      ctx.fillRect(0, 0, 1, 1);
      const [r = 0, g = 0, b = 0, a = 0] = ctx.getImageData(0, 0, 1, 1).data;
      return [key, `rgba(${r}, ${g}, ${b}, ${+(a / 255).toFixed(3)})`];
    }),
  ) as ThemeColors;
}
