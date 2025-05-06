// src/App.js
import React from 'react';
import TaskForm from './components/Tasks/TaskForm';
import TaskList from './components/Tasks/TaskList';
import TaskCalendar from './components/Calendar/TaskCalendar';
import { useTheme, themeStyles } from './styles/theme';
// Убираем импорты для роутинга и аутентификации, если они не используются сейчас
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import TasksPage from './pages/TasksPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Navbar from './components/Layout/Navbar';
// import { useSelector } from 'react-redux';
// import { selectIsAuthenticated } from './features/auth/authSlice';

function App() {
  const { theme, toggleTheme } = useTheme();
  const currentThemeStyles = themeStyles[theme];
  // const isAuthenticated = useSelector(selectIsAuthenticated); // Закомментировано

  // const PrivateRoute = ({ children }) => { // Закомментировано
  //   return isAuthenticated ? children : <Navigate to="/login" />;
  // };

  return (
    // <Router> // Закомментировано
      <div style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: currentThemeStyles.backgroundColor,
        color: currentThemeStyles.color,
        minHeight: '100vh'
      }}>
        {/* <Navbar /> Закомментировано */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Менеджер Задач</h1>
          <button onClick={toggleTheme} style={{ padding: '8px', cursor: 'pointer', backgroundColor: currentThemeStyles.buttonBackgroundColor, color: currentThemeStyles.buttonColor, border: 'none' }}>
            Переключить на {theme === 'light' ? 'темную' : 'светлую'} тему
          </button>
        </div>

        <TaskForm />
        <TaskList />
        <TaskCalendar />

        {/* 
        <Routes> // Закомментировано
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/tasks" 
            element={
              // <PrivateRoute> // Закомментировано
                <TasksPage />
              // </PrivateRoute> // Закомментировано
            } 
          />
          // <Route path="*" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} /> // Закомментировано
        </Routes>
        */}
      </div>
    // </Router> // Закомментировано
  );
}

export default App;