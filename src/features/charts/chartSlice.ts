import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface ChartState {
  id: number;
  name: string;
  prices: { date: string; price: number }[];
  quantity: number;
  enabled: boolean;
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
    addCharts: (state: ChartsState, action: PayloadAction<ChartState[]>) => {
      action.payload.forEach(chart => {
        state.value[chart.id] = chart;
      });
    },
    removeChart: (state: ChartsState, action: PayloadAction<number>) => {
      delete state.value[action.payload];
    },
    updateChart: (state: ChartsState, action: PayloadAction<ChartState>) => {
      state.value[action.payload.id] = action.payload;
    },
    toggleChartEnabled: (state: ChartsState, action: PayloadAction<{ id: number, enabled: boolean }>) => {
      state.value[action.payload.id].enabled = action.payload.enabled;
    }
  },
});

export const { addChart, addCharts, removeChart, updateChart, toggleChartEnabled } = slice.actions;

export const selectCharts = (state: RootState) => state.charts.value;
export const selectChartIds = (state: RootState) => Object.keys(state.charts.value).map(id => parseInt(id));
export const selectChart = (state: RootState, id: number) => state.charts.value[id] ?? null;

export default slice.reducer;