'use client';

import ReactECharts from 'echarts-for-react';
import { barBorderRadius, textColor } from '../_utils/chart';

export default function ExpensesBreakdownChart() {
  return (
    <ReactECharts
      style={{ height: '700px' }}
      theme="dark"
      option={{
        backgroundColor: 'transparent',
        grid: {
          top: 35,
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
          type: 'scroll',
          top: 0,
          data: categories.map(c => c.name),
          textStyle: { color: textColor },
          pageTextStyle: { color: textColor },
          pageIconColor: textColor,
          pageIconInactiveColor: 'rgba(255,255,255,0.2)',
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

// TODO: remove these mocks
const months = [
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
  {
    name: 'Healthcare',
    color: '#ec407a',
    data: [80, 120, 60, 90, 150, 70, 55, 90, 110, 80, 100, 130],
  },
  {
    name: 'Education',
    color: '#7e57c2',
    data: [200, 200, 200, 200, 200, 0, 0, 0, 200, 200, 200, 200],
  },
  {
    name: 'Clothing',
    color: '#26a69a',
    data: [50, 30, 80, 120, 60, 40, 70, 90, 50, 60, 130, 200],
  },
  {
    name: 'Insurance',
    color: '#d4e157',
    data: [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
  },
  {
    name: 'Gym',
    color: '#ff7043',
    data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
  },
  {
    name: 'Subscriptions',
    color: '#29b6f6',
    data: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
  },
  {
    name: 'Dining Out',
    color: '#ffa726',
    data: [120, 140, 90, 150, 180, 200, 170, 130, 110, 140, 160, 210],
  },
  {
    name: 'Travel',
    color: '#66bb6a',
    data: [0, 0, 300, 0, 400, 0, 600, 0, 0, 250, 0, 500],
  },
  {
    name: 'Personal Care',
    color: '#f06292',
    data: [40, 45, 35, 50, 55, 60, 45, 40, 50, 55, 60, 65],
  },
  {
    name: 'Pets',
    color: '#8d6e63',
    data: [70, 80, 65, 90, 75, 85, 70, 75, 80, 90, 85, 95],
  },
  {
    name: 'Home Maintenance',
    color: '#546e7a',
    data: [0, 50, 200, 80, 60, 30, 150, 20, 40, 100, 50, 30],
  },
  {
    name: 'Electronics',
    color: '#00e5ff',
    data: [0, 200, 0, 0, 150, 0, 0, 300, 0, 0, 0, 400],
  },
  {
    name: 'Books',
    color: '#ffca28',
    data: [20, 15, 25, 30, 10, 20, 15, 25, 20, 30, 20, 40],
  },
  {
    name: 'Gifts',
    color: '#e91e63',
    data: [30, 20, 40, 20, 60, 30, 20, 20, 20, 100, 50, 250],
  },
  {
    name: 'Coffee',
    color: '#a1887f',
    data: [55, 60, 50, 65, 70, 75, 80, 70, 60, 65, 70, 75],
  },
  {
    name: 'Alcohol',
    color: '#ce93d8',
    data: [30, 25, 35, 40, 50, 70, 80, 60, 40, 35, 30, 60],
  },
  {
    name: 'Snacks',
    color: '#ffcc02',
    data: [25, 30, 20, 35, 40, 45, 50, 40, 30, 35, 40, 50],
  },
  {
    name: 'Parking',
    color: '#607d8b',
    data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
  },
  {
    name: 'Tolls',
    color: '#80cbc4',
    data: [15, 10, 12, 18, 20, 22, 25, 20, 15, 12, 10, 15],
  },
  {
    name: 'Fuel',
    color: '#ffb74d',
    data: [80, 75, 85, 90, 95, 100, 90, 85, 80, 90, 95, 100],
  },
  {
    name: 'Car Maintenance',
    color: '#e57373',
    data: [0, 60, 0, 200, 0, 80, 0, 60, 0, 150, 0, 90],
  },
  {
    name: 'Haircut',
    color: '#ba68c8',
    data: [25, 0, 25, 0, 25, 0, 25, 0, 25, 0, 25, 0],
  },
  {
    name: 'Laundry',
    color: '#4dd0e1',
    data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  },
  {
    name: 'Cleaning',
    color: '#aed581',
    data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  },
  {
    name: 'Office Supplies',
    color: '#ff8a65',
    data: [20, 15, 25, 10, 30, 15, 20, 10, 25, 15, 20, 30],
  },
  {
    name: 'Software',
    color: '#64b5f6',
    data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
  },
  {
    name: 'Gaming',
    color: '#9575cd',
    data: [40, 60, 30, 50, 70, 80, 90, 60, 40, 50, 60, 100],
  },
  {
    name: 'Music',
    color: '#4db6ac',
    data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  },
  {
    name: 'Sports',
    color: '#dce775',
    data: [50, 40, 60, 70, 80, 90, 85, 70, 60, 50, 40, 30],
  },
  {
    name: 'Hobbies',
    color: '#f48fb1',
    data: [35, 40, 50, 60, 45, 55, 65, 50, 40, 45, 55, 70],
  },
  {
    name: 'Charity',
    color: '#80deea',
    data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
  },
  {
    name: 'Childcare',
    color: '#ffab40',
    data: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
  },
  {
    name: 'Baby Supplies',
    color: '#a5d6a7',
    data: [80, 90, 85, 95, 80, 75, 90, 85, 80, 90, 95, 100],
  },
  {
    name: 'School Supplies',
    color: '#90caf9',
    data: [0, 0, 50, 0, 0, 0, 0, 150, 50, 0, 0, 0],
  },
  {
    name: 'Photography',
    color: '#b39ddb',
    data: [0, 0, 60, 0, 0, 120, 0, 0, 80, 0, 0, 0],
  },
  {
    name: 'Art Supplies',
    color: '#ffccbc',
    data: [20, 30, 25, 35, 20, 30, 25, 20, 30, 25, 35, 40],
  },
  {
    name: 'Gardening',
    color: '#c8e6c9',
    data: [0, 10, 40, 60, 80, 70, 50, 40, 30, 10, 0, 0],
  },
  {
    name: 'Furniture',
    color: '#b3e5fc',
    data: [0, 0, 0, 400, 0, 0, 0, 200, 0, 0, 300, 0],
  },
  {
    name: 'Appliances',
    color: '#e1bee7',
    data: [0, 0, 150, 0, 0, 0, 250, 0, 0, 180, 0, 0],
  },
  {
    name: 'Renovation',
    color: '#fff9c4',
    data: [0, 0, 0, 0, 800, 0, 0, 0, 0, 0, 500, 0],
  },
  {
    name: 'Legal',
    color: '#d7ccc8',
    data: [0, 0, 200, 0, 0, 0, 0, 0, 150, 0, 0, 0],
  },
  {
    name: 'Taxes',
    color: '#b0bec5',
    data: [0, 0, 0, 500, 0, 0, 0, 0, 0, 0, 0, 200],
  },
  {
    name: 'Parking Tickets',
    color: '#ef9a9a',
    data: [0, 30, 0, 0, 60, 0, 0, 30, 0, 0, 30, 0],
  },
  {
    name: 'Miscellaneous',
    color: '#eceff1',
    data: [30, 40, 35, 45, 30, 50, 40, 35, 45, 50, 40, 60],
  },
];
