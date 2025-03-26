import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodoAsync, deleteTodoAsync } from '../features/todos/todosSlice';
import { useTheme, themeStyles } from '../styles/theme'; // Импортируем useTheme и themeStyles

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const { theme } = useTheme(); // Получаем тему из контекста
  const currentThemeStyles = themeStyles[theme]; // Получаем стили для текущей темы

  const handleCheckboxClick = () => {
    dispatch(toggleTodoAsync({ id: todo.id, completed: !todo.completed }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodoAsync({ id: todo.id }));
  };

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px',
      borderBottom: `1px solid ${currentThemeStyles.borderColor}`, // Применяем цвет границы из темы
      color: currentThemeStyles.color, // Применяем цвет текста из темы
    }}>
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxClick}
          style={{ marginRight: '10px' }}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
      </div>
      <button onClick={handleDeleteClick} style={{
        backgroundColor: currentThemeStyles.deleteButtonBackgroundColor, // Применяем фон кнопки удаления из темы
        color: currentThemeStyles.deleteButtonColor, // Применяем цвет текста кнопки удаления из темы
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer'
      }}>
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;