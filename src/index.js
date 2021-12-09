import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './pages/Dashboard';
import App from './App';
ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <Dashboard />
  </StrictMode>,
  document.getElementById('root')
);
