// src/components/Tasks/EditTaskModal.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskAsync } from '../../features/tasks/tasksSlice';
import { themeStyles } from '../../styles/theme';

function EditTaskModal({ task, onClose, theme }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [deadline, setDeadline] = useState(task.deadline ? task.deadline.split('T')[0] : '');
  const [status, setStatus] = useState(task.status);
  const [tagsInput, setTagsInput] = useState((task.tags || []).join(', ')); // Инициализация тегов

  const dispatch = useDispatch();
  const currentThemeStyles = themeStyles[theme];

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
    setDeadline(task.deadline ? task.deadline.split('T')[0] : '');
    setStatus(task.status);
    setTagsInput((task.tags || []).join(', ')); // Обновляем теги при изменении task
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = tagsInput.split(',')
                              .map(tag => tag.trim())
                              .filter(tag => tag !== '');
    const updatedFields = { title, description, deadline, status, completed: status === 'completed', tags: tagsArray };
    dispatch(updateTaskAsync({ id: task.id, updatedFields }));
    onClose();
  };

  // ... (стили modalStyle, overlayStyle, inputStyle остаются прежними) ...
  const modalStyle = { /* ... как было ... */ };
  const overlayStyle = { /* ... как было ... */ };
  const inputStyle = { /* ... как было ... */ };


  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <h2 style={{marginTop: 0}}>Редактировать задачу</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="edit-title" style={{display: 'block', marginBottom: '5px'}}>Название:</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            required
          />
          <label htmlFor="edit-desc" style={{display: 'block', marginBottom: '5px'}}>Описание:</label>
          <textarea
            id="edit-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}
          />
          <label htmlFor="edit-deadline" style={{display: 'block', marginBottom: '5px'}}>Срок:</label>
          <input
            id="edit-deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={inputStyle}
          />
          <label htmlFor="edit-status" style={{display: 'block', marginBottom: '5px'}}>Статус:</label>
          <select
            id="edit-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option value="new">Новая</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершена</option>
          </select>
          <label htmlFor="edit-tags" style={{display: 'block', marginBottom: '5px'}}>Теги (через запятую):</label>
          <input
            id="edit-tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            style={inputStyle}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button type="button" onClick={onClose} style={{
                padding: '10px 15px', marginRight: '10px', cursor: 'pointer',
                backgroundColor: currentThemeStyles.deleteButtonBackgroundColor,
                color: currentThemeStyles.deleteButtonColor,
                border: 'none', borderRadius: '4px'
            }}>
              Отмена
            </button>
            <button type="submit" style={{
                padding: '10px 15px', cursor: 'pointer',
                backgroundColor: currentThemeStyles.buttonBackgroundColor,
                color: currentThemeStyles.buttonColor,
                border: 'none', borderRadius: '4px'
            }}>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTaskModal;