import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import { ChartsWrapper } from './features/charts/ChartsWrapper';
import 'app/gateway';
import { TablesWrapper } from './features/tables/TablesWrapper';
import { Settings } from './features/settings/Settings';
import { Brokers } from './features/brokers/Brokers';

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
  },
  {
    path: '/brokers',
    element: <Brokers />,
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
