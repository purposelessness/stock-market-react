import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface DateState {
  date: string;
}

const initialState: DateState = {
  date: '2021-12-05',
};

export const slice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state: DateState, action: PayloadAction<DateState>) => {
      state.date = action.payload.date;
    },
  },
});

export const { setDate } = slice.actions;

export const selectDate = (state: RootState) => state.date.date;

export default slice.reducer;
