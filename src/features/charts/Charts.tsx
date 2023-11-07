import React from 'react';

import { useAppSelector } from 'app/hooks';
import { selectChartIds } from './chartSlice';
import { Chart } from './Chart';
import { ChartInfo } from './ChartInfo';

export function Charts() {
  const chartIds = selectChartIds(useAppSelector((state) => state));

  if (chartIds.length === 0) {
    return (
      <div>
        <p>No charts found</p>
      </div>
    );
  }

  return (
    <div>
      {chartIds.map((id) => (
        <div>
          <Chart key={'chart-' + id} id={id} />
          <ChartInfo key={'chart-info-' + id} id={id} />
        </div>
      ))}
    </div>
  );
}