import type { ThemeColors } from "@/hooks/use-theme-colors";
import { tooltipZIndexCss } from "@/lib/echarts";

export const barBorderRadius = [2, 2, 0, 0];

export function axisStyle(colors: ThemeColors) {
  return {
    axisLabel: { color: colors.mutedForeground },
    axisLine: { lineStyle: { color: colors.border } },
    axisTick: { lineStyle: { color: colors.border } },
    splitLine: { lineStyle: { color: colors.border } },
  };
}

export function legendStyle(colors: ThemeColors) {
  return {
    textStyle: { color: colors.mutedForeground },
    pageTextStyle: { color: colors.mutedForeground },
    pageIconColor: colors.foreground,
    pageIconInactiveColor: colors.border,
  };
}

export function tooltipStyle(colors: ThemeColors) {
  return {
    backgroundColor: colors.popover,
    borderColor: colors.border,
    textStyle: { color: colors.popoverForeground },
    extraCssText: tooltipZIndexCss,
  };
}
