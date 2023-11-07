import React from 'react';

import { useAppDispatch } from '../../app/hooks';
import { getStocks } from '../../app/httpClient';
import { addCharts } from '../charts/chartSlice';
import { Tables } from './Tables';

export function TablesWrapper() {
  const dispatch = useAppDispatch();

  const stockDetails = getStocks();

  stockDetails.subscribe({
    next(response) {
      dispatch(addCharts(response));
    },
    error(error) {
      console.warn(error);
    },
  });

  return (
    <Tables />
  )
}