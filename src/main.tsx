import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import '@fontsource-variable/manrope';
import '@fontsource-variable/noto-sans-kr';
import './styles.css';
import './content.css';
import './learning.css';
import App from './App';

declare global {
  interface Window { __PORTFOLIO_STANDALONE__?: boolean }
}

const standalone = window.location.protocol === 'file:' || window.__PORTFOLIO_STANDALONE__;
const Router = standalone ? HashRouter : BrowserRouter;
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Router basename={standalone ? undefined : import.meta.env.BASE_URL}><App /></Router></React.StrictMode>);
