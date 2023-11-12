import React from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectChartId, selectChartIds, selectSelectedChartId } from './chartSlice';
import { Chart } from './Chart';
import { ChartInfo } from './ChartInfo';

export function Charts() {
  const dispatch = useAppDispatch();
  const chartIds = selectChartIds(useAppSelector((state) => state));
  const chartId = selectSelectedChartId(useAppSelector((state) => state)) ?? 0;

  if (chartIds.length === 0) {
    return (
      <div>
        <p>No charts found</p>
      </div>
    );
  }

  return (
    <div>
      <select onChange={(e) => {
        console.log(e.target.value);
        dispatch(selectChartId(Number(e.target.value)));
      }}>
        {chartIds.map((id) => (
          <option key={'option-' + id} value={id}>
            {id}
          </option>
        ))}
      </select>

      <div>
        <Chart key={'chart-' + chartId} id={chartId} />
        <ChartInfo key={'chart-info-' + chartId} id={chartId} />
      </div>
    </div>
  );
}