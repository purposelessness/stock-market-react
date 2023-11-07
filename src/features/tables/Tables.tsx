import React from 'react';

import { selectChartIds } from '../charts/chartSlice';
import { useAppSelector } from '../../app/hooks';
import { Table } from './Table';

export function Tables() {
  const chartIds = selectChartIds(useAppSelector((state) => state));

  if (chartIds.length === 0) {
    return (
      <div>
        <p>No tables found</p>
      </div>
    );
  }

  return (
    <div>
      {chartIds.map((id) => (
        <div>
          <Table id={id} />
        </div>
      ))}
    </div>
  )
}