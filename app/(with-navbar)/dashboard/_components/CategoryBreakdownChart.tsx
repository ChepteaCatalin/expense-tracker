"use client";

import ReactECharts from "echarts-for-react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { textStyle } from "@/lib/echarts";
import {
  axisStyle,
  barBorderRadius,
  legendStyle,
  tooltipStyle,
} from "../_utils/chart";
import type { BreakdownChartData } from "@/types/dashboard";

export default function CategoryBreakdownChart({
  chartData,
}: {
  chartData: BreakdownChartData;
}) {
  const theme = useThemeColors();

  return (
    <div className="h-175">
      {theme && (
        <ReactECharts
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
              formatter: (params: any[]) => {
                const nonZero = params
                  .filter((p) => p.value > 0)
                  .sort((a, b) => b.value - a.value);
                if (!nonZero.length) return "";
                const header = `<div style="margin-bottom:8px">${params[0].name}</div>`;
                const rows = nonZero
                  .map(
                    (p) =>
                      `<div style="display:flex;align-items:center;justify-content:space-between;gap:20px">` +
                      `<span>${p.marker} ${p.seriesName}</span>` +
                      `<span style="font-weight:bold;margin-left:auto">${(+p.value).toLocaleString()}</span>` +
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
