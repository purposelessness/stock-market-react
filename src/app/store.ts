import {configureStore} from '@reduxjs/toolkit';

import counterReducer from 'features/counter/counterSlice';
import chartsReducer from 'features/charts/chartSlice';
import chartImprintsReducer from 'features/charts/chartImprintsSlice';

const store= configureStore({
  reducer: {
    counter: counterReducer,
    charts: chartsReducer,
    chartImprints: chartImprintsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;