'use client';

import { ExpenseCategoriesChartData } from '@/types/expense';
import { fromCents, readableCurrency } from '@/utils/currency';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReactECharts from 'echarts-for-react';

export default function ExpensesByCategoryChart({
  data,
  currency,
}: {
  data: ExpenseCategoriesChartData;
  currency: string;
}) {
  const isDesktop = useMediaQuery('(min-width: 1000px)');
  const sum = fromCents(data.reduce((sum, item) => sum + item.value, 0));

  return (
    <ReactECharts
      style={{ height: isDesktop ? '300px' : '250px', width: '100%' }}
      theme="dark"
      option={{
        backgroundColor: 'transparent',
        title: {
          text: `${readableCurrency(sum)} ${currency}`,
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
            `${params.marker} <b>${params.name}:</b> ${readableCurrency(params.value)} ${currency} (${params.percent}%)`,
          textStyle: { color: 'rgb(227, 227, 227)' },
          extraCssText: 'white-space: normal',
        },
        series: [
          {
            name: 'Category',
            type: 'pie',
            radius: [innerRadius(sum), '95%'],
            itemStyle: {
              borderColor: 'rgb(227, 227, 227)',
              borderWidth: 1,
            },
            color: data.map(item => item.color),
            label: { show: false },
            data: data.map(item => ({ ...item, value: fromCents(item.value) })),
          },
        ],
      }}
    />
  );
}

function innerRadius(value: number) {
  if (value >= 1_000_000) return '65%';
  if (value >= 100_000) return '60%';
  return '55%';
}
