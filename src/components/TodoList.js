import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { getTodosAsync } from '../features/todos/todosSlice';
import { selectTodos } from '../features/todos/todosSelectors';
import { useTheme, themeStyles } from '../styles/theme'; // Импортируем themeStyles вместе с useTheme

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const { theme } = useTheme(); // Получаем тему из контекста
  const currentThemeStyles = themeStyles[theme]; // Получаем стили для текущей темы

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Загрузка задач...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка загрузки задач: {error}</div>;
  }

  return (
    <ul style={{ backgroundColor: currentThemeStyles.backgroundColor }}> {/* Используем currentThemeStyles.backgroundColor */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;