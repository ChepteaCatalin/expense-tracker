'use client';

import { ExpensesByCategoryChartData } from '@/types/expense';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReactECharts from 'echarts-for-react';

export default function ExpensesByCategoryChart({
  data,
  currency,
}: {
  data: ExpensesByCategoryChartData;
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
          confine: true,
          formatter: (params: any) =>
            `${params.marker} <b>${params.name}:</b> ${formatNr(params.value)} ${currency} (${params.percent}%)`,
          textStyle: { color: 'rgb(227, 227, 227)' },
          extraCssText: 'white-space: normal',
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
  return new Intl.NumberFormat('en-US').format(value).replace(/,/g, ' ');
}
