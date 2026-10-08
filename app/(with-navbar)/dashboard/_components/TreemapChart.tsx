"use client";

import type { CategoryTreemapNode } from "@/types/dashboard";
import { escapeHtml, textStyle } from "@/lib/echarts";
import ReactECharts from "echarts-for-react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { tooltipStyle } from "../_utils/chart";

export default function TreemapChart({
  data,
  currency,
}: {
  data: CategoryTreemapNode[];
  currency?: string;
}) {
  const theme = useThemeColors();

  const totalAmount = data.reduce((sum, category) => sum + category.value, 0);

  return (
    <div className="h-175">
      {theme && (
        <ReactECharts
          style={{ height: "100%" }}
          theme={theme.dark ? "dark" : undefined}
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
                breadcrumb: {
                  itemStyle: {
                    color: theme.colors.muted,
                    textStyle: { color: theme.colors.mutedForeground },
                  },
                  emphasis: {
                    itemStyle: {
                      color: theme.colors.border,
                      textStyle: { color: theme.colors.foreground },
                    },
                  },
                },
              },
            ],
            tooltip: {
              trigger: "item",
              confine: true,
              ...tooltipStyle(theme.colors),
              formatter: (params: {
                name: string;
                value: number;
                dataIndex: number;
              }) =>
                `<b>${params.dataIndex === 0 ? "Total" : escapeHtml(params.name)}:</b> <b>${params.value.toLocaleString()}${currency ? ` ${currency}` : ""}</b> (${totalAmount > 0 ? ((params.value / totalAmount) * 100).toFixed(2) : 0}%)`,
            },
          }}
        />
      )}
    </div>
  );
}
