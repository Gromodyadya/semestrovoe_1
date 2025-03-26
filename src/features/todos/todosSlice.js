import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate API calls (replace with actual API in real project)
const fakeApiDelay = 500;

const fakeApi = {
  async getTodos() {
    await new Promise((resolve) => setTimeout(resolve, fakeApiDelay));
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  },
  async addTodo(title) {
    await new Promise((resolve) => setTimeout(resolve, fakeApiDelay));
    const newTodo = { id: Date.now(), title, completed: false };
    return newTodo;
  },
  async toggleTodo(id, completed) {
    await new Promise((resolve) => setTimeout(resolve, fakeApiDelay));
    return { id, completed };
  },
  async deleteTodo(id) {
    await new Promise((resolve) => setTimeout(resolve, fakeApiDelay));
    return { id };
  },
};


export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const todos = await fakeApi.getTodos();
    return todos;
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (title) => {
    const todo = await fakeApi.addTodo(title);
    return todo;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodoAsync',
  async ({ id, completed }) => {
    const updatedTodo = await fakeApi.toggleTodo(id, completed);
    return updatedTodo;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async ({ id }) => {
    await fakeApi.deleteTodo(id);
    return { id };
  }
);


export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        localStorage.setItem('todos', JSON.stringify(state.items)); // Сохраняем в localStorage после загрузки
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        localStorage.setItem('todos', JSON.stringify(state.items)); // Сохраняем в localStorage после добавления
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index].completed = action.payload.completed;
        }
        localStorage.setItem('todos', JSON.stringify(state.items)); // Сохраняем в localStorage после изменения статуса
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload.id);
        localStorage.setItem('todos', JSON.stringify(state.items)); // Сохраняем в localStorage после удаления
      });
  },
});

export default todosSlice.reducer;