import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTodoApi, deleteTodoApi, fetchTodosApi, sortTodosApi, updateTodoApi } from '../../api/todos';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (config, { rejectWithValue }) => {
  try {
    const resp = await fetchTodosApi(config);
    return resp.data;
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
})

export const addTodo = createAsyncThunk('todos/addTodo', async ({todo, config}, { rejectWithValue }) => {
  try {
    const resp = await addTodoApi(todo, config);
    return resp.data;
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({editedTodo, config}, { rejectWithValue }) => {
  try {
    const resp = await updateTodoApi(editedTodo, config);

    return resp.data;
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async ({todo, config}, { rejectWithValue }) => {
  try {
    const resp = await deleteTodoApi(todo, config);
    
    return resp.data;
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
})

export const sortTodos = createAsyncThunk('todos/sortTodos', async ({method, config}, { rejectWithValue}) => {
  try {
    const resp = await sortTodosApi(method, config);
    return resp.data;
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
})

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    userTodos: [],
    loading: 'idle',
    error: null
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'loading';
      }
    },
    [fetchTodos.fulfilled]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        state.userTodos = action.payload;
        state.error = null;
      }
    },
    [fetchTodos.rejected]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';

        if (action.payload) {
          state.error = action.payload.errMsg;
        }
        else {
          state.error = action.error;
        }
      }
    },
    [addTodo.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'loading';
      }
    },
    [addTodo.fulfilled]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        state.userTodos = state.userTodos.concat(action.payload);
        state.error = null;
      }
    },
    [addTodo.rejected]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        
        if (action.payload) {
          state.error = action.payload.errMsg;
        }
        else {
          state.errMsg = action.error;
        }
      }
    },
    [updateTodo.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'loading';
      }
    },
    [updateTodo.fulfilled]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';

        const foundIndex = state.userTodos.findIndex(todo => todo.t_id === action.payload.t_id);

        state.userTodos[foundIndex] = action.payload; 
        state.error = null;
      }
    },
    [updateTodo.rejected]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';

        if (action.payload) {
          state.error = action.payload.errMsg;
        }
        else {
          state.error = action.error;
        }
      }
    },
    [sortTodos.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'loading';
      }
    },
    [sortTodos.fulfilled]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        state.userTodos = action.payload;
        state.error = null;
      }
    },
    [sortTodos.rejected]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        
        if (action.payload) {
          state.error = action.payload.errMsg;
        }
        else {
          state.error = action.error;
        }
      }
    },
    [deleteTodo.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'loading';
      }
    },
    [deleteTodo.fulfilled]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        state.userTodos = state.userTodos.filter(todo => todo.t_id !== action.payload.t_id);
        state.error = null;
      }
    },
    [deleteTodo.rejected]: (state, action) => {
      if (state.loading === 'loading') {
        state.loading = 'idle';
        
        if (action.payload) {
          state.error = action.payload.errMsg;
        }
        else {
          state.error = action.error;
        }
      }
    }
  }
})

export const { setTodos } = todosSlice.actions;

// SELECTORS
export const selectAllTodos = state => state.todos.userTodos;

export default todosSlice.reducer;