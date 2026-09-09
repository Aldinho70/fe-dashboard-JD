import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { darkTheme } from './theme/theme.js';
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={ darkTheme }>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
