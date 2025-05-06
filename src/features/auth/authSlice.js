import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Расширяем fakeApi для аутентификации
const fakeAuthApi = {
  async login(credentials) {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Простая проверка: если username = 'user' и password = 'password'
    if (credentials.username === 'user' && credentials.password === 'password') {
      const fakeToken = 'fake-jwt-token-' + Date.now();
      const fakeUser = { id: 1, username: 'user', email: 'user@example.com' };
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('authUser', JSON.stringify(fakeUser));
      return { token: fakeToken, user: fakeUser };
    } else {
      throw new Error('Неверные учетные данные');
    }
  },
  async register(userData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Симуляция регистрации: всегда успешно, если username не 'user' (чтобы не конфликтовать с логином)
    if (userData.username === 'user') {
        throw new Error('Пользователь с таким именем уже существует (для демо)');
    }
    const fakeToken = 'fake-jwt-token-' + Date.now();
    const fakeUser = { id: Date.now(), username: userData.username, email: userData.email };
    localStorage.setItem('authToken', fakeToken);
    localStorage.setItem('authUser', JSON.stringify(fakeUser));
    return { token: fakeToken, user: fakeUser };
  },
  async logout() {
    await new Promise(resolve => setTimeout(resolve, 100));
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }
};

// Thunks
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await fakeAuthApi.login(credentials);
      return data; // { token, user }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await fakeAuthApi.register(userData);
      return data; // { token, user }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { dispatch }) => {
      await fakeAuthApi.logout();
      dispatch(clearAuthState()); // Очищаем состояние после выхода
      // Можно также сбросить состояние задач, если они специфичны для пользователя
      // dispatch(tasksSlice.actions.resetTasksState()); // Потребует добавления такого reducer в tasksSlice
  }
);


const initialState = {
  user: JSON.parse(localStorage.getItem('authUser')) || null,
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
    },
    // Для проверки состояния при загрузке приложения
    checkAuthStatus: (state) => {
        const token = localStorage.getItem('authToken');
        const user = JSON.parse(localStorage.getItem('authUser'));
        if (token && user) {
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
        } else {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Register
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Logout (fulfilled of logoutAsync is handled by clearAuthState)
      .addCase(logoutAsync.fulfilled, (state) => {
        // clearAuthState уже должен быть вызван в thunk
        // Здесь можно дополнительно что-то сделать, если нужно, но обычно не требуется
        console.log("Logout successful, state cleared via clearAuthState.");
      });
  },
});

export const { clearAuthState, checkAuthStatus } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;