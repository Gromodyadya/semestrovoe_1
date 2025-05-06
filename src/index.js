// src/index.js (или App.js в useEffect без зависимостей)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from './styles/theme';
import { checkAuthStatus } from './features/auth/authSlice'; // Импорт

store.dispatch(checkAuthStatus()); // Проверяем статус аутентификации при запуске

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);