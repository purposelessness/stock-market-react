import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface ChartImprintState {
  id: number;
  name: string;
  price: number;
  quantity: number;
  enabled: boolean;
}

interface ChartImprintsState {
  value: { [id: number]: ChartImprintState };
}

const initialState: ChartImprintsState = {
  value: {},
};

export const slice = createSlice({
  name: 'chartImprints',
  initialState,
  reducers: {
    addChartImprint: (state: ChartImprintsState, action: PayloadAction<ChartImprintState>) => {
      state.value[action.payload.id] = action.payload;
    },
    removeChartImprint: (state, action: PayloadAction<number>) => {
      delete state.value[action.payload];
    },
    updateChartImprint: (state, action: PayloadAction<ChartImprintState>) => {
      state.value[action.payload.id] = action.payload;
    },
  },
});

export const { addChartImprint, removeChartImprint, updateChartImprint } = slice.actions;

export const selectChartImprints = (state: RootState) => state.chartImprints.value;
export const selectChartImprint = (state: RootState, id: number) => state.chartImprints.value[id] ?? null;

export default slice.reducer;