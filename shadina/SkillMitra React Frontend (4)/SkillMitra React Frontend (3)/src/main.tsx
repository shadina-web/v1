
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './index.css'
import './colors.css'
import './styles/animations.css'
import './i18n/config' // Initialize i18n
import App from './App.tsx'

createRoot(document.getElementById("root")!).render(<App />);
  