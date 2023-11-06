import React from 'react';

import {
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  LineElement,
  PointElement, TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import {Line} from 'react-chartjs-2';

import { useAppSelector } from 'app/hooks';
import { selectChart } from './chartSlice';

export function Chart(params: { id: number }) {
  const {id} = params;

  ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

  const chart = selectChart(useAppSelector((state) => state), id);

  if (!chart) {
    return (
      <div>
        <p>Chart not found</p>
      </div>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: chart.name,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
        },
      }
    },
  };

  const dates: string[] = [];
  const values: number[] = [];
  chart.prices.forEach(({date, price}, key) => {
    dates.push(date);
    values.push(price);
  });

  const data = {
    labels: dates,
    datasets: [
      {
        label: chart.name,
        data: values,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      }
    ],
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
