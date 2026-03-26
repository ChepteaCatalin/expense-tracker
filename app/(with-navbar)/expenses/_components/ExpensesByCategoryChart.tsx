'use client';

import useMediaQuery from '@mui/material/useMediaQuery';
import ReactECharts from 'echarts-for-react';

export default function ExpensesByCategoryChart({
  currency,
}: {
  currency: string;
}) {
  const isDesktop = useMediaQuery('(min-width: 1000px)');

  const data = [
    { value: 1048, name: 'Search Engine' },
    { value: 735.12, name: 'Direct' },
    { value: 508, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ];

  return (
    <ReactECharts
      style={{ height: isDesktop ? '300px' : '250px', width: '100%' }}
      theme="dark"
      option={{
        backgroundColor: 'transparent',
        title: {
          text: `${formatNr(Math.floor(data.reduce((sum, item) => sum + item.value, 0)))} ${currency}`,
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
              borderColor: '#fff',
              borderWidth: 1,
            },
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
