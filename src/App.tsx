import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import { ChartsWrapper } from './features/charts/ChartsWrapper';
import 'app/gateway';
import { TablesWrapper } from './features/tables/TablesWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChartsWrapper />,
  },
  {
    path: '/charts',
    element: <ChartsWrapper />,
  },
  {
    path: '/tables',
    element: <TablesWrapper />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
