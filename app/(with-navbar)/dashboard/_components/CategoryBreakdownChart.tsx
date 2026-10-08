"use client";

import EChart from "@/components/EChart";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { escapeHtml, textStyle } from "@/lib/echarts";
import {
  axisStyle,
  barBorderRadius,
  legendStyle,
  tooltipStyle,
} from "../_utils/chart";
import type { BreakdownChartData } from "@/types/dashboard";
import type { TooltipComponentFormatterCallbackParams } from "echarts";

export default function CategoryBreakdownChart({
  chartData,
}: {
  chartData: BreakdownChartData;
}) {
  const theme = useThemeColors();

  return (
    <div className="h-175">
      {theme && (
        <EChart
          style={{ height: "100%" }}
          theme={theme.dark ? "dark" : undefined}
          option={{
            textStyle,
            backgroundColor: "transparent",
            grid: {
              top: 35,
              bottom: 65,
              left: 0,
              right: 0,
            },
            dataZoom: [
              {
                type: "slider",
                right: 5,
                bottom: 10,
                showDetail: false,
              },
            ],
            xAxis: {
              type: "category",
              data: chartData.months,
              axisPointer: { type: "shadow" },
              ...axisStyle(theme.colors),
            },
            yAxis: {
              type: "value",
              ...axisStyle(theme.colors),
            },
            series: chartData.categories.map((category, index) => ({
              name: category.categoryName,
              data: category.data,
              type: "bar",
              stack: "total",
              color: category.backgroundColor,
              itemStyle: {
                borderRadius:
                  index === chartData.categories.length - 1
                    ? barBorderRadius
                    : [0, 0, 0, 0],
              },
            })),
            legend: {
              type: "scroll",
              top: 0,
              data: chartData.categories.map((c) => ({
                name: c.categoryName,
                itemStyle: { color: c.backgroundColor },
              })),
              ...legendStyle(theme.colors),
            },
            tooltip: {
              trigger: "axis",
              position: "inside",
              confine: true,
              ...tooltipStyle(theme.colors),
              axisPointer: { type: "shadow" },
              formatter: (params: TooltipComponentFormatterCallbackParams) => {
                const items = Array.isArray(params) ? params : [params];
                const nonZero = items
                  .filter((p) => Number(p.value) > 0)
                  .sort((a, b) => Number(b.value) - Number(a.value));
                if (!nonZero.length) return "";
                const header = `<div style="margin-bottom:8px">${escapeHtml(items[0]?.name)}</div>`;
                const rows = nonZero
                  .map(
                    (p) =>
                      `<div style="display:flex;align-items:center;justify-content:space-between;gap:20px">` +
                      `<span>${p.marker} ${escapeHtml(p.seriesName)}</span>` +
                      `<span style="font-weight:bold;margin-left:auto">${Number(p.value).toLocaleString()}</span>` +
                      `</div>`,
                  )
                  .join("");
                return header + rows;
              },
            },
          }}
        />
      )}
    </div>
  );
}
