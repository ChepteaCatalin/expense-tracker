'use client';

import ReactECharts from 'echarts-for-react';

export default function IncomeVsExpensesChart({
  currency,
}: {
  currency?: string;
}) {
  return (
    <ReactECharts
      style={{ height: '300px' }}
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
          },
        ],
        xAxis: {
          type: 'category',
          data: data.months,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Income',
            data: data.income,
            type: 'bar',
            stack: 'income',
            barMaxWidth: 40,
            color: '#66bb6a',
          },
          {
            name: 'Expenses',
            data: data.expenses,
            type: 'bar',
            stack: 'expenses',
            barMaxWidth: 40,
            color: '#f44336',
          },
        ],
        tooltip: {
          trigger: 'axis',
          position: 'inside',
          confine: true,
          formatter: (params: any) =>
            `${params.marker} <b>${params.seriesName} in ${params.name}:</b> ${params.value} ${currency || ''}`,
          textStyle: { color: 'rgb(227, 227, 227)' },
        },
      }}
    />
  );
}

//TODO: map to readable currency the income and expenses
const data = {
  months: [
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
  ],
  income: [
    5000, 7000, 8000, 6000, 7500, 9000, 8500, 9500, 11000, 12000, 13000, 12500,
  ],
  expenses: [
    3000, 4000, 3500, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500,
  ],
};
