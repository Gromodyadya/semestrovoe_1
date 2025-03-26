import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem('appTheme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const themeStyles = {
  light: {
    backgroundColor: '#ffffff',
    color: '#000000',
    inputBackgroundColor: '#f0f0f0',
    inputTextColor: '#000000', // Явно задаем цвет текста для инпута в светлой теме
    buttonBackgroundColor: '#4CAF50',
    buttonColor: 'white',
    deleteButtonBackgroundColor: '#f44336',
    deleteButtonColor: 'white',
    borderColor: '#eee',
  },
  dark: {
    backgroundColor: '#222222', // Сделаем фон темнее, но не совсем черным
    color: '#EEEEEE', // Сделаем текст светло-серым для лучшей читаемости на темном фоне
    inputBackgroundColor: '#333333', // Фон инпута немного светлее общего фона
    inputTextColor: '#ffffff', // Явно задаем белый цвет текста для инпута в темной теме
    buttonBackgroundColor: '#689F38',
    buttonColor: 'white',
    deleteButtonBackgroundColor: '#D32F2F',
    deleteButtonColor: 'white',
    borderColor: '#555', // Граница немного темнее для темной темы
  },
};