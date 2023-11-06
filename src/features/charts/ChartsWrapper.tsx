import React from 'react';

import { useAppDispatch } from 'app/hooks';
import { getStocks } from 'app/httpClient';
import { addChart } from './chartSlice';
import { Charts } from './Charts';

export function ChartsWrapper() {
  const dispatch = useAppDispatch();

  const stockDetails = getStocks();
  stockDetails.subscribe({
    next(response) {
      for (const stock of response) {
        dispatch(addChart(stock));
      }
    },
    error(error) {
      console.warn(error);
    },
    complete() {
      console.log("completed");
    }
  });

  return (
    <Charts />
  )
}