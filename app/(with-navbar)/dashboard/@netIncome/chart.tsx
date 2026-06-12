'use client';

import ReactECharts from 'echarts-for-react';

interface ChartData {
  months: string[];
  income: number[];
  expenses: number[];
  netIncome: number[];
}

export default function NetIncomeChart({ data }: { data: ChartData }) {
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
            stack: 'income',
            barMaxWidth: 40,
            color: '#66bb6a',
            itemStyle,
          },
          {
            name: names[2],
            data: data.expenses,
            type: 'bar',
            stack: 'expenses',
            barMaxWidth: 40,
            color: '#f44336',
            itemStyle,
          },
        ],
        legend: {
          top: 0,
          data: names,
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

const textColor = 'rgba(255, 255, 255, 0.7)';
const itemStyle = {
  borderRadius: [2, 2, 0, 0],
};
const names = ['Net Income', 'Income', 'Expenses'];
