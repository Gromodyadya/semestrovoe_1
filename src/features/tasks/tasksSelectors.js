// src/features/tasks/tasksSelectors.js
import { createSelector } from '@reduxjs/toolkit'; // Для более сложных селекторов

export const selectTasks = state => state.tasks.items;
export const selectTasksStatus = state => state.tasks.status;
export const selectTasksError = state => state.tasks.error;

export const selectTasksByStatus = (state, status) =>
  state.tasks.items.filter(task => task.status === status);

// Селектор для получения всех уникальных тегов
export const selectUniqueTags = createSelector(
  [selectTasks], // Зависимость от селектора selectTasks
  (tasks) => {
    const allTags = tasks.reduce((acc, task) => {
      if (task.tags && task.tags.length > 0) {
        task.tags.forEach(tag => acc.add(tag));
      }
      return acc;
    }, new Set()); // Используем Set для автоматического получения уникальных значений
    return Array.from(allTags).sort(); // Преобразуем в массив и сортируем
  }
);