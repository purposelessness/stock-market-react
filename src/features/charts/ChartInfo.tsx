import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectChartImprint } from './chartImprintsSlice';

export function ChartInfo(params: {id: number}) {
  const {id} = params;

  const chartImprint = selectChartImprint(useAppSelector((state) => state), id);
  if (!chartImprint) {
    return (
      <div>
        <p>Stock info not found</p>
      </div>
    );
  }

  return (
    <div data-chart-imprint={chartImprint}>
      <h3>{chartImprint.name}</h3>
      <p>Price: {chartImprint.price}</p>
      <p>Quantity: {chartImprint.quantity}</p>
    </div>
  )
}