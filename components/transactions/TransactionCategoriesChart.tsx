"use client";

import { textStyle } from "@/lib/echarts";
import type { TransactionCategoriesChartData } from "@/types/transaction";
import { readableCurrency } from "@/utils/currency";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";

export default function TransactionCategoriesChart({
  data,
  currency,
}: {
  data: TransactionCategoriesChartData;
  currency: string;
}) {
  const { theme } = useTheme();

  const sum = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-62.5 lg:h-75">
      <ReactECharts
        style={{ height: "100%" }}
        theme={theme}
        option={{
          textStyle,
          backgroundColor: "transparent",
          title: {
            text: `${readableCurrency(sum)} ${currency}`,
            left: "center",
            top: "center",
            textStyle: {
              fontSize: 18,
              fontWeight: 700,
            },
          },
          tooltip: {
            trigger: "item",
            position: "inside",
            confine: true,
            formatter: (params: any) =>
              `${params.marker} <b>${params.name}:</b> ${readableCurrency(params.value)} ${currency} (${params.percent}%)`,
            extraCssText: "white-space: normal",
          },
          series: [
            {
              name: "Category",
              type: "pie",
              radius: [innerRadius(sum), "95%"],
              itemStyle: {
                borderColor:
                  theme === "dark"
                    ? "rgb(227, 227, 227)"
                    : "rgb(133, 133, 133)",
                borderWidth: 1,
              },
              color: data.map((item) => item.color),
              label: { show: false },
              data: data.map((item) => ({ ...item, value: item.value })),
            },
          ],
        }}
      />
    </div>
  );
}

function innerRadius(value: number) {
  if (value >= 1_000_000) return "65%";
  if (value >= 100_000) return "60%";
  return "55%";
}
