"use client";

import ReactECharts from "echarts-for-react";
import { barBorderRadius, textColor } from "../_utils/chart";

interface ChartData {
  months: string[];
  income: number[];
  expenses: number[];
  netIncome: number[];
}

export default function NetIncomeChart({ data }: { data: ChartData }) {
  return (
    <ReactECharts
      style={{ height: "350px" }}
      theme="dark"
      option={{
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
          axisLabel: { color: textColor },
        },
        yAxis: {
          type: "value",
          axisLabel: { color: textColor },
        },
        series: [
          {
            name: names[0],
            type: "line",
            data: data.netIncome,
            color: "#ffca28",
          },
          {
            name: names[1],
            data: data.income,
            type: "bar",
            color: "#66bb6a",
            itemStyle: {
              borderRadius: barBorderRadius,
            },
          },
          {
            name: names[2],
            data: data.expenses,
            type: "bar",
            color: "#f44336",
            itemStyle: {
              borderRadius: barBorderRadius,
            },
          },
        ],
        legend: {
          top: 0,
          data: names,
          textStyle: { color: textColor },
        },
        tooltip: {
          trigger: "axis",
          position: "inside",
          confine: true,
          textStyle: { color: textColor },
          extraCssText: "z-index: 1000",
        },
      }}
    />
  );
}

const names = ["Net Income", "Income", "Expenses"];
