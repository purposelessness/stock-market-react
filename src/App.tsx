import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import { ChartsWrapper } from './features/charts/ChartsWrapper';
import 'app/gateway';
import { TablesWrapper } from './features/tables/TablesWrapper';
import { Settings } from './features/settings/Settings';

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
  {
    path: '/settings',
    element: <Settings />,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
