import React from 'react';

import { selectChartId, selectChartIds, selectSelectedChartId } from '../charts/chartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Table } from './Table';

export function Tables() {
  const dispatch = useAppDispatch();
  const chartIds = selectChartIds(useAppSelector((state) => state));
  const chartId = selectSelectedChartId(useAppSelector((state) => state)) ?? 0;

  if (chartIds.length === 0) {
    return (
      <div>
        <p>No tables found</p>
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

      <div className={'stock-table'}>
        <Table key={'table-' + chartId} id={chartId} />
      </div>
    </div>
  )
}