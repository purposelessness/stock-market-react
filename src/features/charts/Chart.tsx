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
import { selectDate } from './dateSlice';

let globalDate: string;

export function Chart(params: { id: number }) {
  const {id} = params;

  ChartJs.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Title,
    TimeScale
  );

  const chart = selectChart(useAppSelector((state) => state), id);
  globalDate = selectDate(useAppSelector((state) => state));

  if (!chart) {
    return (
      <div>
        <p>Chart not found</p>
      </div>
    );
  }

  if (!chart.enabled) {
    return (
      <div>
        <p>Chart disabled</p>
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

  const maxDate = new Date(dates[0]).getTime();
  const minDate = new Date(dates[dates.length - 1]).getTime();

  const data = {
    labels: dates,
    datasets: [
      {
        type: 'line' as const,
        label: chart.name,
        data: values,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const plugins = [
    {
      id: 'tooltipVerticalLine',
      afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any }) => {
        // eslint-disable-next-line no-underscore-dangle
        if (chart.tooltip._active && chart.tooltip._active.length) {
          // find coordinates of tooltip
          const activePoint = chart.tooltip._active[0];
          const { ctx } = chart;
          const { x } = activePoint.element;
          const topY = chart.scales.y.top;
          const bottomY = chart.scales.y.bottom;

          // draw vertical line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#999999' as const;
          ctx.stroke();
          ctx.restore();
        }
      },
    },
    {
      id: 'dateVerticalLine',
      afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any }) => {
        const { ctx } = chart;

        const dateTime = new Date(globalDate).getTime();
        const x = (dateTime - minDate) / (maxDate - minDate) * chart.scales.x.width + chart.scales.x.left;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        // draw vertical line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#1C2128' as const;
        ctx.stroke();
        ctx.restore();
      },
    }
  ];

  return (
    <div data-date={globalDate}>
      <Line data={data} options={options} plugins={plugins} />
    </div>
  );
}
