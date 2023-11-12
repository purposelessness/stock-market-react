import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface BrokerState {
  id: number;
  login: string;
  money: number;
}

interface BrokersState {
  value: { [id: number]: BrokerState };
}

const initialState: BrokersState = {
  value: {},
};

export const slice = createSlice({
  name: 'brokers',
  initialState,
  reducers: {
    addBroker: (state: BrokersState, action: PayloadAction<BrokerState>) => {
      state.value[action.payload.id] = action.payload;
    },
    removeBroker: (state, action: PayloadAction<number>) => {
      delete state.value[action.payload];
    },
    updateBroker: (state, action: PayloadAction<BrokerState>) => {
      state.value[action.payload.id] = action.payload;
    },
  },
});

export const { addBroker, removeBroker, updateBroker } = slice.actions;

export const selectBrokers = (state: RootState) => state.brokers.value;
export const selectBrokersList = (state: RootState) => Object.keys(state.brokers.value).map(id => {
  const broker = state.brokers.value[Number(id)];
  return {
    id: broker.id,
    login: broker.login,
    money: broker.money,
  };
});
export const selectBroker = (state: RootState, id: number) => state.brokers.value[id] ?? null;

export default slice.reducer;
