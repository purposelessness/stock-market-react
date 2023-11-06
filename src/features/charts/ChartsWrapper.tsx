import React from 'react';

import { useAppDispatch } from 'app/hooks';
import { getStocks } from 'app/httpClient';
import { addCharts } from './chartSlice';
import { Charts } from './Charts';
import { stocksSocket } from '../../app/gateway';
import { setDate } from './dateSlice';

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
  stockDetails.subscribe({
    next(response) {
      dispatch(addCharts(response));
    },
    error(error) {
      console.warn(error);
    },
    complete() {
      console.log("completed");
    }
  });

  stocksSocket.on('updateStock', (data: UpdateStockResponse) => {
    console.log(data);
    dispatch(setDate({ date: data.date }));
  });

  return (
    <Charts />
  )
}