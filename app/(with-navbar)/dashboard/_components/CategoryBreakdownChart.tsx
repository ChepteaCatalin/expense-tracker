'use client';

import ReactECharts from 'echarts-for-react';
import { barBorderRadius, textColor } from '../_utils/chart';
import type { BreakdownChartData } from '@/types/dashboard';

export default function CategoryBreakdownChart({
  chartData,
}: {
  chartData: BreakdownChartData;
}) {
  return (
    <ReactECharts
      style={{ height: '700px' }}
      theme="dark"
      option={{
        backgroundColor: 'transparent',
        grid: {
          top: 35,
          bottom: 65,
          left: 0,
          right: 0,
        },
        dataZoom: [
          {
            type: 'slider',
            right: 5,
            bottom: 10,
            showDetail: false,
          },
        ],
        xAxis: {
          type: 'category',
          data: chartData.months,
          axisPointer: { type: 'shadow' },
          axisLabel: { color: textColor },
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: textColor },
        },
        series: chartData.categories.map((category, index) => ({
          name: category.categoryName,
          data: category.data,
          type: 'bar',
          stack: 'total',
          color: category.backgroundColor,
          itemStyle: {
            borderRadius:
              index === chartData.categories.length - 1
                ? barBorderRadius
                : [0, 0, 0, 0],
          },
        })),
        legend: {
          type: 'scroll',
          top: 0,
          data: chartData.categories.map(c => c.categoryName),
          textStyle: { color: textColor },
          pageTextStyle: { color: textColor },
          pageIconColor: textColor,
          pageIconInactiveColor: 'rgba(255,255,255,0.2)',
        },
        tooltip: {
          trigger: 'axis',
          position: 'inside',
          confine: true,
          textStyle: { color: textColor },
          axisPointer: { type: 'shadow' },
        },
      }}
    />
  );
}
