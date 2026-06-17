'use client';

import ReactECharts from 'echarts-for-react';
import { barBorderRadius, textColor } from '../_utils/chart';

export default function ExpensesBreakdownChart() {
  return (
    <ReactECharts
      style={{ height: '350px' }}
      theme="dark"
      option={{
        backgroundColor: 'transparent',
        grid: {
          top: 30,
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
        series: categories.map((category, index) => ({
          name: category.name,
          data: category.data,
          type: 'bar',
          stack: 'total',
          color: category.color,
          itemStyle: {
            borderRadius:
              index === categories.length - 1 ? barBorderRadius : [0, 0, 0, 0],
          },
        })),
        legend: {
          top: 0,
          data: categories.map(c => c.name),
          textStyle: { color: textColor },
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

// Mock data
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const categories = [
  {
    name: 'Rent',
    color: '#ef5350',
    data: [
      1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200,
    ],
  },
  {
    name: 'Food',
    color: '#ff9800',
    data: [380, 420, 350, 410, 460, 390, 430, 400, 370, 450, 490, 520],
  },
  {
    name: 'Utilities',
    color: '#42a5f5',
    data: [110, 130, 100, 90, 85, 80, 95, 105, 100, 115, 140, 160],
  },
  {
    name: 'Transport',
    color: '#ab47bc',
    data: [95, 110, 90, 85, 100, 120, 95, 90, 105, 110, 95, 100],
  },
  {
    name: 'Entertainment',
    color: '#26c6da',
    data: [60, 75, 50, 90, 110, 130, 120, 80, 70, 95, 85, 140],
  },
  {
    name: 'Other',
    color: '#78909c',
    data: [45, 60, 55, 70, 50, 65, 80, 55, 60, 75, 90, 110],
  },
];
