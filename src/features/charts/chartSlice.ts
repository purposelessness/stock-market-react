import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface ChartState {
  id: number;
  name: string;
  prices: { date: string; price: number }[];
  quantity: number;
}

interface ChartsState {
  value: { [id: number]: ChartState };
}

const initialState: ChartsState = {
  value: {},
};

export const slice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    addChart: (state: ChartsState, action: PayloadAction<ChartState>) => {
      state.value[action.payload.id] = action.payload;
    },
    removeChart: (state: ChartsState, action: PayloadAction<number>) => {
      delete state.value[action.payload];
    },
    updateChart: (state: ChartsState, action: PayloadAction<ChartState>) => {
      state.value[action.payload.id] = action.payload;
    },
  },
});

export const { addChart, removeChart, updateChart } = slice.actions;

export const selectCharts = (state: RootState) => state.charts.value;
export const selectChartIds = (state: RootState) => Object.keys(state.charts.value).map(id => parseInt(id));
export const selectChart = (state: RootState, id: number) => state.charts.value[id] ?? null;

export default slice.reducer;