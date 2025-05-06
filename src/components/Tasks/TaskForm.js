// src/components/Tasks/TaskForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskAsync } from '../../features/tasks/tasksSlice';
import { useTheme, themeStyles } from '../../styles/theme';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('new');
  const [tagsInput, setTagsInput] = useState(''); // Состояние для строки тегов

  const dispatch = useDispatch();
  const { theme } = useTheme();
  const currentThemeStyles = themeStyles[theme];

  const onSubmit = (event) => {
    event.preventDefault();
    if (title.trim()) {
      const tagsArray = tagsInput.split(',')
                                .map(tag => tag.trim())
                                .filter(tag => tag !== ''); // Удаляем пустые теги
      dispatch(addTaskAsync({ title, description, deadline, status, tags: tagsArray }));
      setTitle('');
      setDescription('');
      setDeadline('');
      setStatus('new');
      setTagsInput(''); // Очищаем поле тегов
    }
  };

  const inputStyle = {
    padding: '8px',
    marginRight: '10px',
    marginBottom: '10px',
    backgroundColor: currentThemeStyles.inputBackgroundColor,
    color: currentThemeStyles.color,
    border: `1px solid ${currentThemeStyles.borderColor}`,
    display: 'block',
    width: 'calc(100% - 20px)',
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
        required
      />
      <textarea
        placeholder="Описание задачи (опционально)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{...inputStyle, height: '60px', resize: 'vertical' }}
      />
      <label htmlFor="deadline" style={{ display: 'block', marginBottom: '5px', color: currentThemeStyles.color }}>Срок выполнения:</label>
      <input
        type="date"
        id="deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        style={inputStyle}
      />
      <label htmlFor="status" style={{ display: 'block', marginBottom: '5px', color: currentThemeStyles.color }}>Статус:</label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={inputStyle}
      >
        <option value="new">Новая</option>
        <option value="in-progress">В процессе</option>
        <option value="completed">Завершена</option>
      </select>
      <label htmlFor="tags" style={{ display: 'block', marginBottom: '5px', color: currentThemeStyles.color }}>Теги (через запятую):</label>
      <input
        type="text"
        id="tags"
        placeholder="например, работа, дом, важно"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={{
        padding: '10px 15px',
        backgroundColor: currentThemeStyles.buttonBackgroundColor,
        color: currentThemeStyles.buttonColor,
        border: 'none',
        cursor: 'pointer',
        width: '100%'
      }}>
        Добавить задачу
      </button>
    </form>
  );
}

export default TaskForm;