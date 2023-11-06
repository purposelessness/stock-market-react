import React from 'react';

import { useAppSelector } from 'app/hooks';
import { selectChartIds } from './chartSlice';
import { Chart } from './Chart';

export function Charts() {
  const chartIds = selectChartIds(useAppSelector((state) => state));

  return (
    <div>
      {chartIds.map((id) => (
        <Chart key={id} id={id} />
      ))}
    </div>
  );
}