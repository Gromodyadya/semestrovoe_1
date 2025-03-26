import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../features/todos/todosSlice';
import { useTheme, themeStyles } from '../styles/theme'; // Импортируем useTheme и themeStyles

function TodoForm() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const { theme } = useTheme(); // Получаем тему из контекста
  const currentThemeStyles = themeStyles[theme]; // Получаем стили для текущей темы

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      dispatch(addTodoAsync(inputValue));
      setInputValue('');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '20px' }}>
      <input
  type="text"
  placeholder="Добавить задачу"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  style={{
    padding: '8px',
    marginRight: '10px',
    backgroundColor: currentThemeStyles.inputBackgroundColor,
    color: currentThemeStyles.color, // Используем цвет текста из темы для инпута, чтобы был виден в темной теме
    border: `1px solid ${currentThemeStyles.borderColor}`,
  }}
/>
      <button type="submit" style={{
        padding: '8px',
        backgroundColor: currentThemeStyles.buttonBackgroundColor, // Применяем фон кнопки из темы
        color: currentThemeStyles.buttonColor, // Применяем цвет текста кнопки из темы
        border: 'none',
        cursor: 'pointer'
      }}>
        Добавить
      </button>
    </form>
  );
}

export default TodoForm;