import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import './index.css';

// Define custom theme
const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff', // Set default background color to white
    },
  },
});

// Render the app wrapped with ThemeProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
