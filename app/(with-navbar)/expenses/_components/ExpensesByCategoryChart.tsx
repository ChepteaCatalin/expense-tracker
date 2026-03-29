'use client';

import useMediaQuery from '@mui/material/useMediaQuery';
import ReactECharts from 'echarts-for-react';
import { ExpenseByCategoryChartData } from '../types';

export default function ExpensesByCategoryChart({
  data,
  currency,
}: {
  data: ExpenseByCategoryChartData;
  currency: string;
}) {
  const isDesktop = useMediaQuery('(min-width: 1000px)');
  const sum = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <ReactECharts
      style={{ height: isDesktop ? '300px' : '250px', width: '100%' }}
      theme="dark"
      option={{
        backgroundColor: 'transparent',
        title: {
          text: `${formatNr(Math.floor(sum))} ${currency}`,
          left: 'center',
          top: 'center',
          textStyle: {
            color: 'rgb(227, 227, 227)',
            fontSize: 18,
            fontWeight: 700,
          },
        },
        tooltip: {
          trigger: 'item',
          position: 'inside',
          formatter: (params: any) =>
            `${params.name}: ${formatNr(params.value)} ${currency} (${params.percent}%)`,
          textStyle: { color: 'rgb(227, 227, 227)' },
        },
        series: [
          {
            name: 'Category',
            type: 'pie',
            radius: ['55%', '95%'],
            itemStyle: {
              borderColor: 'rgb(227, 227, 227)',
              borderWidth: 1,
            },
            color: data.map(item => item.color),
            label: { show: false },
            data,
          },
        ],
      }}
    />
  );
}

function formatNr(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}
