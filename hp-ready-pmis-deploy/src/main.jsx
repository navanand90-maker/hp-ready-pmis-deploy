import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Global reset styles
const style = document.createElement('style');
style.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0e1521;
  }
  ::-webkit-scrollbar-thumb {
    background: #1e3048;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #2a4060;
  }
  select, input {
    outline: none;
  }
  select option {
    background: #0e1521;
    color: #e2e8f0;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
