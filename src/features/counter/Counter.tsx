import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { decrement, increment, selectCount } from './counterSlice';

export function Counter() {
  const count = selectCount(useAppSelector((state) => state));
  const dispatch = useAppDispatch();

  return (
    <div>
      <div >
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span >{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
    </div>
  );
}