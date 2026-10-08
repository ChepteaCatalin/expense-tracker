"use client";

import ReactEChartsCore from "echarts-for-react/lib/core";
import type { EChartsReactProps } from "echarts-for-react/lib/types";
import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart, TreemapChart } from "echarts/charts";
import {
  AxisPointerComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

// Register only the ECharts modules the app uses instead of bundling the full
// library. Add new chart types/components here when a chart starts using them.
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  TreemapChart,
  AxisPointerComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  LabelLayout,
  CanvasRenderer,
]);

export default function EChart(props: Omit<EChartsReactProps, "echarts">) {
  return <ReactEChartsCore echarts={echarts} {...props} />;
}
