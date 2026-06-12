'use client';

import ReactECharts from 'echarts-for-react';

export default function IncomeVsExpensesChart() {
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
          axisPointer: {
            type: 'shadow',
          },
          axisLabel: {
            color: textColor,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: textColor,
          },
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
          {
            name: 'Net Income',
            type: 'line',
            data: data.netIncome,
            color: '#42a5f5',
          },
        ],
        legend: {
          top: 0,
          data: ['Income', 'Expenses', 'Net Income'],
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

//TODO: map to readable currency the income and expenses
//TODO: la net income fa diferenta inainte de a converti in readable currency
const data = {
  months: [
    'Jan 2026',
    'Feb 2026',
    'Mar 2026',
    'Apr 2026',
    'May 2026',
    'Jun 2026',
    'Jul 2026',
    'Aug 2026',
    'Sep 2026',
    'Oct 2026',
    'Nov 2026',
    'Dec 2026',
  ],
  income: [
    5000, 7000, 8000, 6000, 7500, 9000, 8500, 9500, 11000, 12000, 13000, 12500,
  ],
  expenses: [
    3000, 4000, 3500, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500,
  ],
  netIncome: [
    2000, 3000, 4500, 1500, 2500, 3500, 2500, 3000, 4000, 4500, 5000, 4000,
  ],
};

const textColor = 'rgba(255, 255, 255, 0.7)';
