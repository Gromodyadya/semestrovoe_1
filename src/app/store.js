
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import authReducer from '../features/auth/authSlice'; // Добавим позже

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer, // Добавим позже
  },
});