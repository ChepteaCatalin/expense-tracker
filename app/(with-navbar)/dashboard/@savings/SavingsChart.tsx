'use client';

import ReactECharts from 'echarts-for-react';
import { textColor } from '../_utils/chart';

export default function SavingsChart() {
  return (
    <ReactECharts
      style={{ height: '500px' }}
      theme="dark"
      option={{
        backgroundColor: 'transparent',
        grid: {
          top: 0,
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
          data: months,
          axisPointer: { type: 'shadow' },
          axisLabel: { color: textColor },
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: textColor },
        },
        series: [
          {
            type: 'line',
            name: 'Savings',
            data,
            color: '#1ED760',
            smooth: true,
            symbolSize: 13,
            lineStyle: { width: 3 },
          },
        ],
        tooltip: {
          confine: true,
          textStyle: { color: textColor },
        },
      }}
    />
  );
}

//TODO: remove mocks
const months = [
  'Jan 2026',
  'Feb 2026',
  'Mar 2026',
  'Apr 2026',
  'May 2026',
  'Jun 2026',
];

const data = [150, 230, 224, 218, 135, 147];
