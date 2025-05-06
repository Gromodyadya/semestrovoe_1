import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync, selectIsAuthenticated, selectAuthStatus, selectAuthError } from '../features/auth/authSlice';
import { useTheme, themeStyles } from '../styles/theme';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const { theme } = useTheme();
  const currentThemeStyles = themeStyles[theme];

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks'); // или на главную, если задачи там
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync({ username, password }));
  };
  
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 100px)', // Примерная высота, учитывая возможный Navbar/Footer
    padding: '20px',
    backgroundColor: currentThemeStyles.backgroundColor,
    color: currentThemeStyles.color,
  };

  const formStyle = {
    padding: '20px',
    border: `1px solid ${currentThemeStyles.borderColor}`,
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#f9f9f9' : '#444', // Немного другой фон для формы
    minWidth: '300px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: `1px solid ${currentThemeStyles.borderColor}`,
    borderRadius: '4px',
    boxSizing: 'border-box',
    backgroundColor: currentThemeStyles.inputBackgroundColor,
    color: currentThemeStyles.color,
  };
  
  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: currentThemeStyles.buttonBackgroundColor,
    color: currentThemeStyles.buttonColor,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Вход</h2>
        <div>
          <label htmlFor="username">Имя пользователя (user):</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль (password):</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        {authStatus === 'loading' && <p>Загрузка...</p>}
        {authError && <p style={{ color: 'red' }}>{authError}</p>}
        <button type="submit" disabled={authStatus === 'loading'} style={buttonStyle}>
          Войти
        </button>
        <p style={{marginTop: '15px', textAlign: 'center'}}>
          Нет аккаунта? <a href="/register" style={{color: currentThemeStyles.buttonBackgroundColor}}>Зарегистрироваться</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;