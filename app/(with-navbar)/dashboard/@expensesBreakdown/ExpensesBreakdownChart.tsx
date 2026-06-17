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
          data: data.months,
          axisPointer: { type: 'shadow' },
          axisLabel: { color: textColor },
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: textColor },
        },
        series: [
          {
            name: names[0],
            type: 'line',
            data: data.netIncome,
            color: '#ffca28',
          },
          {
            name: names[1],
            data: data.income,
            type: 'bar',
            color: '#66bb6a',
            itemStyle: {
              borderRadius: barBorderRadius,
            },
          },
          {
            name: names[2],
            data: data.expenses,
            type: 'bar',
            color: '#f44336',
            itemStyle: {
              borderRadius: barBorderRadius,
            },
          },
        ],
        legend: {
          top: 0,
          data: categories,
          textStyle: { color: textColor },
        },
        tooltip: {
          trigger: 'axis',
          position: 'inside',
          confine: true,
          textStyle: { color: textColor },
        },
      }}
    />
  );
}

//TODO:
const categories = ['Rent', 'Food', 'Utilities', 'Entertainment', 'Other'];
