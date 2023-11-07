import React from 'react';

import { selectChart } from '../charts/chartSlice';
import { useAppSelector } from '../../app/hooks';

export function Table(params: { id: number }) {
  const {id} = params;

  const chart = selectChart(useAppSelector((state) => state), id);
  if (!chart) {
    return (
      <div>
        <p>Chart not found</p>
      </div>
    );
  }

  const data = chart.prices;

  return (
    <div>
      <h2>{chart.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              <td>{row.date}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}