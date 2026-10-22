"use client";

import EChart from "@/components/EChart";
import { textStyle } from "@/lib/echarts";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { axisStyle, legendStyle, tooltipStyle } from "../_utils/chart";
import type { CurrencySeriesChartData } from "@/types/dashboard";

export default function DebtBalanceChart({
  chartData,
}: {
  chartData: CurrencySeriesChartData;
}) {
  const theme = useThemeColors();

  return (
    <div className="h-125">
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
            series: chartData.series.map((series, index) => {
              const { chart1, chart2, chart3, chart4, chart5 } = theme.colors;
              const lineColors = [chart5, chart4, chart3, chart2, chart1];
              return {
                type: "line",
                name: series.currency,
                data: series.data,
                color: lineColors[index % lineColors.length],
                symbolSize: 13,
                lineStyle: { width: 3 },
              };
            }),
            legend: {
              type: "scroll",
              top: 0,
              ...legendStyle(theme.colors),
            },
            tooltip: {
              trigger: "axis",
              confine: true,
              ...tooltipStyle(theme.colors),
            },
          }}
        />
      )}
    </div>
  );
}
