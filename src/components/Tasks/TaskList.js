// src/components/Tasks/TaskList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import { getTasksAsync } from '../../features/tasks/tasksSlice';
import { selectTasks, selectTasksStatus, selectTasksError, selectUniqueTags } from '../../features/tasks/tasksSelectors';
import { useTheme, themeStyles } from '../../styles/theme';

function TaskList() {
  const dispatch = useDispatch();
  const allTasks = useSelector(selectTasks); // Получаем все задачи
  const status = useSelector(selectTasksStatus);
  const error = useSelector(selectTasksError);
  const uniqueTags = useSelector(selectUniqueTags); // Получаем уникальные теги

  const { theme } = useTheme();
  const currentThemeStyles = themeStyles[theme];

  const [selectedTag, setSelectedTag] = useState(''); // Состояние для выбранного тега фильтра

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTasksAsync());
    }
  }, [status, dispatch]);

  const handleTagFilterChange = (e) => {
    setSelectedTag(e.target.value);
  };

  // Фильтруем задачи по выбранному тегу
  const filteredTasks = selectedTag
    ? allTasks.filter(task => task.tags && task.tags.includes(selectedTag))
    : allTasks;

  if (status === 'loading') {
    return <div style={{color: currentThemeStyles.color}}>Загрузка задач...</div>;
  }

  if (status === 'failed') {
    return <div style={{color: 'red'}}>Ошибка загрузки задач: {error}</div>;
  }

  return (
    <div>
      {/* Фильтр по тегам */}
      {uniqueTags.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="tag-filter" style={{ marginRight: '10px', color: currentThemeStyles.color }}>Фильтр по тегу:</label>
          <select
            id="tag-filter"
            value={selectedTag}
            onChange={handleTagFilterChange}
            style={{
              padding: '8px',
              backgroundColor: currentThemeStyles.inputBackgroundColor,
              color: currentThemeStyles.color,
              border: `1px solid ${currentThemeStyles.borderColor}`,
            }}
          >
            <option value="">Все теги</option>
            {uniqueTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      )}

      {filteredTasks.length === 0 && status === 'succeeded' ? (
         <p style={{color: currentThemeStyles.color}}>
            {selectedTag ? `Нет задач с тегом "${selectedTag}".` : 'Задач пока нет. Добавьте первую!'}
        </p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;