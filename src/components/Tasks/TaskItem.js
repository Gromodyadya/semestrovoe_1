// src/components/Tasks/TaskItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // useDispatch используется
import { updateTaskAsync, deleteTaskAsync } from '../../features/tasks/tasksSlice'; // Импорты используются
import { useTheme, themeStyles } from '../../styles/theme';
import EditTaskModal from './EditTaskModal';

function TaskItem({ task }) {
  const dispatch = useDispatch(); // useDispatch используется
  const { theme } = useTheme();
  const currentThemeStyles = themeStyles[theme];
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = () => {
    dispatch(updateTaskAsync({ // Используем dispatch и updateTaskAsync
      id: task.id,
      updatedFields: { completed: !task.completed, status: !task.completed ? 'completed' : (task.status === 'new' ? 'new' : 'in-progress') }
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTaskAsync({ id: task.id })); // Используем dispatch и deleteTaskAsync
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    dispatch(updateTaskAsync({ // Используем dispatch и updateTaskAsync
      id: task.id,
      updatedFields: { status: newStatus, completed: newStatus === 'completed' }
    }));
  };

  const openEditModal = () => setIsEditing(true);
  const closeEditModal = () => setIsEditing(false);

  const taskDeadline = task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Нет';
  let reminderText = '';
  if (task.deadline && task.status !== 'completed') {
    const timeLeft = new Date(task.deadline).getTime() - new Date().getTime();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3 && daysLeft >= 0) {
      reminderText = ` (Осталось ${daysLeft} д.)`;
    } else if (daysLeft < 0) {
      reminderText = ` (Просрочено)`;
    }
  }

  const tagStyle = {
    display: 'inline-block',
    backgroundColor: theme === 'light' ? '#e0e0e0' : '#555',
    color: theme === 'light' ? '#333' : '#ddd',
    padding: '2px 8px',
    borderRadius: '12px',
    marginRight: '5px',
    marginBottom: '5px',
    fontSize: '0.75em',
  };

  return (
    <li style={{
      padding: '10px',
      border: `1px solid ${currentThemeStyles.borderColor}`,
      marginBottom: '10px',
      borderRadius: '4px',
      backgroundColor: currentThemeStyles.backgroundColor,
      color: currentThemeStyles.color,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{
          margin: '0 0 5px 0',
          textDecoration: task.completed ? 'line-through' : 'none'
        }}>
          {task.title}
        </h3>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          style={{ marginRight: '10px' }}
        />
      </div>
      {task.description && <p style={{ margin: '5px 0', fontSize: '0.9em' }}>{task.description}</p>}

      {task.tags && task.tags.length > 0 && (
        <div style={{ margin: '5px 0' }}>
          {task.tags.map((tag, index) => (
            <span key={index} style={tagStyle}>{tag}</span>
          ))}
        </div>
      )}

      <div style={{ fontSize: '0.8em', marginBottom: '10px' }}>
        <p>Статус:
          <select value={task.status} onChange={handleStatusChange} style={{marginLeft: '5px', backgroundColor: currentThemeStyles.inputBackgroundColor, color: currentThemeStyles.color, border: `1px solid ${currentThemeStyles.borderColor}`}}>
            <option value="new">Новая</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершена</option>
          </select>
        </p>
        <p>Срок: {taskDeadline} <span style={{color: 'orange'}}>{reminderText}</span></p>
        <p style={{fontSize: '0.7em', color: currentThemeStyles.colorMuted || '#888'}}>Создана: {new Date(task.createdAt).toLocaleString()}</p>
      </div>
      <div>
        <button onClick={openEditModal} style={{
            marginRight: '10px',
            padding: '5px 10px',
            backgroundColor: currentThemeStyles.buttonBackgroundColor,
            color: currentThemeStyles.buttonColor,
            border: 'none', cursor: 'pointer'
          }}>
          Редактировать
        </button>
        <button onClick={handleDelete} style={{
            backgroundColor: currentThemeStyles.deleteButtonBackgroundColor,
            color: currentThemeStyles.deleteButtonColor,
            border: 'none', padding: '5px 10px', cursor: 'pointer'
          }}>
          Удалить
        </button>
      </div>
      {isEditing && (
        <EditTaskModal
          task={task}
          onClose={closeEditModal}
          theme={theme}
        />
      )}
    </li>
  );
}

export default TaskItem;