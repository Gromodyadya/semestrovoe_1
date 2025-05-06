// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fakeApiDelay = process.env.REACT_APP_FAKE_API_DELAY ? parseInt(process.env.REACT_APP_FAKE_API_DELAY) : 500;

const fakeApi = {
  async getTasks() {
    await new Promise((resolve) => setTimeout(resolve, fakeApiDelay));
    const storedTasks = localStorage.getItem('tasks');
    // Добавим преобразование для старых задач без тегов
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    return tasks.map(task => ({ ...task, tags: task.tags || [] })); // Гарантируем наличие tags
  },
  async addTask(taskData) {
    await new Promise((resolve) => setTimeout(resolve, fakeApiDelay));
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description || '',
      completed: false,
      status: taskData.status || 'new',
      deadline: taskData.deadline || null,
      createdAt: new Date().toISOString(),
      tags: taskData.tags || [], // Добавляем теги
    };
    return newTask;
  },
  async updateTask(id, updatedFields) {
    await new Promise((resolve) => setTimeout(resolve, fakeApiDelay));
    // Если tags переданы как строка, преобразуем в массив
    if (typeof updatedFields.tags === 'string') {
        updatedFields.tags = updatedFields.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    } else if (updatedFields.tags === undefined) {
        // Если tags не переданы, не изменяем их (или можно установить [], если логика это требует)
        // Для простоты, если поле tags не пришло, оно не будет обновлено (API-like поведение)
    }
    return { id, ...updatedFields };
  },
  async deleteTask(id) {
    await new Promise((resolve) => setTimeout(resolve, fakeApiDelay));
    return { id };
  },
};

// Thunks (остаются без изменений, т.к. передают данные "как есть")
export const getTasksAsync = createAsyncThunk(
  'tasks/getTasksAsync',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await fakeApi.getTasks();
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTaskAsync = createAsyncThunk(
  'tasks/addTaskAsync',
  async (taskData, { rejectWithValue }) => {
    try {
      const task = await fakeApi.addTask(taskData);
      return task;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTaskAsync',
  async ({ id, updatedFields }, { rejectWithValue }) => {
    try {
      const updatedTaskData = await fakeApi.updateTask(id, updatedFields);
      return updatedTaskData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTaskAsync',
  async ({ id }, { rejectWithValue }) => {
    try {
      await fakeApi.deleteTask(id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Можно добавить синхронные редюсеры, если нужно
  },
  extraReducers: (builder) => {
    builder
      // Get Tasks
      .addCase(getTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(task => ({ ...task, tags: task.tags || [] })); // Убедимся, что tags - массив
        localStorage.setItem('tasks', JSON.stringify(state.items));
      })
      .addCase(getTasksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Add Task
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        // Убедимся, что у новой задачи есть поле tags (даже если пустое)
        state.items.push({ ...action.payload, tags: action.payload.tags || [] });
        localStorage.setItem('tasks', JSON.stringify(state.items));
      })
      // Update Task
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          // Обеспечиваем, что поле tags всегда массив, даже если оно не было в action.payload
          const updatedTask = { 
            ...state.items[index], 
            ...action.payload,
            tags: action.payload.tags !== undefined ? action.payload.tags : state.items[index].tags || []
          };
          state.items[index] = updatedTask;
        }
        localStorage.setItem('tasks', JSON.stringify(state.items));
      })
      // Delete Task
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload.id);
        localStorage.setItem('tasks', JSON.stringify(state.items));
      });
  },
});

export default tasksSlice.reducer;