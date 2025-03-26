import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTheme, themeStyles } from './styles/theme'; // Импортируем useTheme и themeStyles

function App() {
  const { theme, toggleTheme } = useTheme(); // Получаем тему и функцию toggleTheme из контекста
  const currentThemeStyles = themeStyles[theme]; // Получаем стили для текущей темы

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: currentThemeStyles.backgroundColor, // Применяем фон из темы
      color: currentThemeStyles.color, // Применяем цвет текста из темы
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>To-Do List</h1>
        <button onClick={toggleTheme} style={{ padding: '8px', cursor: 'pointer' }}>
          Переключить на {theme === 'light' ? 'темную' : 'светлую'} тему
        </button>
      </div>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;