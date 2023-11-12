import {configureStore} from '@reduxjs/toolkit';

import dateReducer from 'features/charts/dateSlice';
import chartsReducer from 'features/charts/chartSlice';
import chartImprintsReducer from 'features/charts/chartImprintsSlice';
import brokersReducer from 'features/brokers/brokerSlice';

const store= configureStore({
  reducer: {
    date: dateReducer,
    charts: chartsReducer,
    chartImprints: chartImprintsReducer,
    brokers: brokersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;