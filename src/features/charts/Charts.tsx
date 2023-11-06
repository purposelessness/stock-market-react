import React from 'react';

import { getStocks } from 'app/httpClient';
import { useAppDispatch } from 'app/hooks';
import { addChart } from './chartSlice';
import { Chart } from './Chart';

export function Charts() {
  const dispatch = useAppDispatch();

  const stockDetails = getStocks();
  stockDetails.subscribe({
    next(response) {
      console.log(response);
      dispatch(addChart(response));
    },
    error(error) {
      console.warn(error);
    },
    complete() {
      console.log("completed");
    }
  });

  return (
    <Chart id={0} />
  );
}