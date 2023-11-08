import React from 'react';

import { useAppDispatch } from 'app/hooks';
import { getDate, getStockImprints, getStocks } from 'app/httpClient';
import { addCharts } from './chartSlice';
import { Charts } from './Charts';
import { stocksSocket } from '../../app/gateway';
import { setDate } from './dateSlice';
import { addChartImprint } from './chartImprintsSlice';

interface StockImprint {
  id: number,
  name: string,
  price: number,
  quantity: number,
}

interface UpdateStockResponse {
  date: string;
  stockImprint: StockImprint | null;
}

export function ChartsWrapper() {
  const dispatch = useAppDispatch();

  const stockDetails = getStocks();
  const stockImprints = getStockImprints();
  const date = getDate();

  date.subscribe({
    next(response) {
      dispatch(setDate({ date: response }));
    },
    error(error) {
      console.warn(error);
    },
  });

  stockDetails.subscribe({
    next(response) {
      dispatch(addCharts(response));
    },
    error(error) {
      console.warn(error);
    },
  });

  stockImprints.subscribe({
    next(responses) {
      for (let response of responses) {
        if (response.stockImprint !== null) {
          dispatch(addChartImprint(response.stockImprint));
        }
      }
    },
    error(error) {
      console.warn(error);
    },
  });

  stocksSocket.on('updateStock', (data: UpdateStockResponse) => {
    dispatch(setDate({ date: data.date }));
    if (data.stockImprint !== null) {
      dispatch(addChartImprint(data.stockImprint));
    }
  });

  return (
    <Charts />
  )
}