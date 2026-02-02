import React from 'react'
import ReactDOM from 'react-dom/client'
import { init } from '@telegram-apps/sdk'
import App from './App.tsx'
import './index.css'

try {
  init();
} catch (e) {
  console.warn('cannot initialize telegram SDK, may not in Telegram environment', e);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)