"use client";

import type { CategoryTreemapNode } from "@/types/dashboard";
import { textStyle } from "@/lib/echarts";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";

export default function TreemapChart({
  data,
  currency,
}: {
  data: CategoryTreemapNode[];
  currency?: string;
}) {
  const { resolvedTheme } = useTheme();

  const totalAmount = data.reduce((sum, category) => sum + category.value, 0);

  return (
    <div className="h-175">
      <ReactECharts
        style={{ height: "100%" }}
        theme={resolvedTheme}
        option={{
          textStyle,
          backgroundColor: "transparent",
          series: [
            {
              type: "treemap",
              data: data.map((category) => ({
                name: category.categoryName,
                value: category.value,
                itemStyle: {
                  color: category.backgroundColor,
                },
              })),
              label: {
                show: true,
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: 14,
                fontWeight: 700,
                textBorderColor: "rgba(0, 0, 0, 0.35)",
                textBorderWidth: 2,
                overflow: "truncate",
              },
            },
          ],
          tooltip: {
            trigger: "item",
            confine: true,
            formatter: (params: {
              name: string;
              value: number;
              dataIndex: number;
            }) =>
              `<b>${params.dataIndex === 0 ? "Total" : params.name}:</b> <b>${params.value.toLocaleString()}${currency ? ` ${currency}` : ""}</b> (${totalAmount > 0 ? ((params.value / totalAmount) * 100).toFixed(2) : 0}%)`,
            extraCssText: "z-index: 1000",
          },
        }}
      />
    </div>
  );
}
