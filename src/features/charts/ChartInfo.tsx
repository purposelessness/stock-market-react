import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectChartImprint } from './chartImprintsSlice';
import { stocksSocket } from '../../app/gateway';
import { selectChart } from './chartSlice';

async function onToggleActive(id: number, enabled: boolean) {
  if (enabled) {
    console.log('deactivateStock', id);
    stocksSocket.emit('deactivateStock', { id: id });
  } else {
    console.log('activateStock', id);
    stocksSocket.emit('activateStock', { id: id });
  }
}

export function ChartInfo(params: {id: number}) {
  const {id} = params;

  const chart = selectChart(useAppSelector((state) => state), id);
  const chartImprint = selectChartImprint(useAppSelector((state) => state), id);

  if (!chartImprint || !chart.enabled || !chartImprint.price) {
    return (
      <div>
        <button onClick={() => onToggleActive(id, chart.enabled)}>Toggle Active</button>
        <p>Stock info not found</p>
      </div>
    );
  }

  return (
    <div data-chart-imprint={chartImprint}>
      <h3>{chartImprint.name}</h3>
      <p>Price: {chartImprint.price}</p>
      <p>Quantity: {chartImprint.quantity}</p>
      <button onClick={() => onToggleActive(id, chart.enabled)}>Toggle Active</button>
    </div>
  )
}