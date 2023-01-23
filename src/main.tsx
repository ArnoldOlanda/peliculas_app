import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MovieProvider } from './context/MovieContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>,
)
