import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/CanvasToolbar.css';
import { CanvasContextProvider } from './CanvasContextProvider.tsx';
import { CanvasContainer } from './CanvasContainer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h2>Three.js canvas using Prime template POC</h2>
    <CanvasContextProvider>
      <CanvasContainer />
    </CanvasContextProvider>
  </React.StrictMode>,
);
