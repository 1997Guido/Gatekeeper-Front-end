// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { register as registerServiceWorker } from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

registerServiceWorker();