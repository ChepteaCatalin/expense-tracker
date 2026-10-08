"use client";

import EChart from "@/components/EChart";
import { textStyle } from "@/lib/echarts";
import { useThemeColors } from "@/hooks/use-theme-colors";
import {
  axisStyle,
  barBorderRadius,
  legendStyle,
  tooltipStyle,
} from "../_utils/chart";

interface ChartData {
  months: string[];
  income: number[];
  expenses: number[];
  netIncome: number[];
}

export default function NetIncomeChart({ data }: { data: ChartData }) {
  const theme = useThemeColors();

  return (
    <div className="h-87.5">
      {theme && (
        <EChart
          style={{ height: "100%" }}
          theme={theme.dark ? "dark" : undefined}
          option={{
            textStyle,
            backgroundColor: "transparent",
            grid: {
              top: 30,
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
              data: data.months,
              axisPointer: { type: "shadow" },
              ...axisStyle(theme.colors),
            },
            yAxis: {
              type: "value",
              ...axisStyle(theme.colors),
            },
            series: [
              {
                name: names[0],
                type: "line",
                data: data.netIncome,
                color: theme.colors.chart3,
              },
              {
                name: names[1],
                data: data.income,
                type: "bar",
                color: theme.colors.primaryLight,
                itemStyle: {
                  borderRadius: barBorderRadius,
                },
              },
              {
                name: names[2],
                data: data.expenses,
                type: "bar",
                color: theme.colors.destructive,
                itemStyle: {
                  borderRadius: barBorderRadius,
                },
              },
            ],
            legend: {
              top: 0,
              data: names,
              ...legendStyle(theme.colors),
            },
            tooltip: {
              trigger: "axis",
              position: "inside",
              confine: true,
              ...tooltipStyle(theme.colors),
            },
          }}
        />
      )}
    </div>
  );
}

const names = ["Net Income", "Income", "Expenses"];
