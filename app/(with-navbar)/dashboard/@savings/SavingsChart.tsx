"use client";

import ReactECharts from "echarts-for-react";
import { textColor } from "../_utils/chart";
import type { SavingsChartData } from "@/types/dashboard";

export default function SavingsChart({
  chartData,
}: {
  chartData: SavingsChartData;
}) {
  return (
    <ReactECharts
      style={{ height: "500px" }}
      theme="dark"
      option={{
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
          axisLabel: { color: textColor },
        },
        yAxis: {
          type: "value",
          axisLabel: { color: textColor },
        },
        series: chartData.series.map((series, index) => ({
          type: "line",
          name: series.currency,
          data: series.data,
          color: lineColors[index % lineColors.length],
          smooth: true,
          symbolSize: 13,
          lineStyle: { width: 3 },
        })),
        legend: {
          type: "scroll",
          top: 0,
          textStyle: { color: textColor },
          pageTextStyle: { color: textColor },
          pageIconColor: textColor,
          pageIconInactiveColor: "rgba(255,255,255,0.2)",
        },
        tooltip: {
          trigger: "axis",
          confine: true,
          textStyle: { color: textColor },
          extraCssText: "z-index: 1000",
        },
      }}
    />
  );
}

const lineColors = ["#1ED760", "#4FC3F7", "#FFD166", "#FF7B72", "#C792EA"];
