'use client';

import type { CategoryTreemapNode } from '@/types/dashboard';
import ReactECharts from 'echarts-for-react';
import { textColor } from '../_utils/chart';

export default function TreemapChart({
  data,
  currency,
}: {
  data: CategoryTreemapNode[];
  currency?: string;
}) {
  const totalAmount = data.reduce((sum, category) => sum + category.value, 0);

  return (
    <ReactECharts
      style={{ height: '700px' }}
      theme="dark"
      option={{
        backgroundColor: 'transparent',
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        series: [
          {
            type: 'treemap',
            data: data.map(category => ({
              name: category.categoryName,
              value: category.value,
              itemStyle: {
                color: category.backgroundColor,
              },
            })),
            label: {
              show: true,
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: 14,
              fontWeight: 700,
              textBorderColor: 'rgba(0, 0, 0, 0.35)',
              textBorderWidth: 2,
              overflow: 'truncate',
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          confine: true,
          textStyle: { color: textColor },
          formatter: (params: {
            name: string;
            value: number;
            dataIndex: number;
          }) =>
            `<span style="color: rgba(255, 255, 255, 0.96); font-weight: 700;">${params.dataIndex === 0 ? 'Total' : params.name}:</span> <strong>${params.value.toLocaleString()}${currency ? ` ${currency}` : ''}</strong> (${totalAmount > 0 ? ((params.value / totalAmount) * 100).toFixed(2) : 0}%)`,
          extraCssText: 'z-index: 1000',
        },
      }}
    />
  );
}
