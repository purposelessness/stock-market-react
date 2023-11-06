import React from 'react';
import './App.css';
import { Counter } from './features/counter/Counter';
import { Charts } from './features/charts/Charts';

function App() {
  return (
    <div className="App">
      <Counter />
      <Charts />
    </div>
  );
}

export default App;
