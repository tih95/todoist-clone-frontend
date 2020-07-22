import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (config, { rejectWithValue }) => {
  try {
    const resp = await axios.get('http://localhost:3001/api/todos', config);
    return resp.data;
  }
  catch(e) {
    return rejectWithValue(e.response.data);
  }
})

export const addTodo = createAsyncThunk('todos/addTodo', async ({todo, config}, { rejectWithValue }) => {
  try {
    const resp = await axios.post('http://localhost:3001/api/todos', todo, config);
    return resp.data;
  }
  catch(e) {
    return rejectWithValue(e.response.data);
  }
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({editedTodo, config}, { rejectWithValue }) => {
  console.log('editedTodo', editedTodo)
  try {
    const resp = await axios.put(`http://localhost:3001/api/todos/${editedTodo.t_id}`, editedTodo, config);
    console.log(resp);
    return resp.data;
  }
  catch(e) {
    return rejectWithValue(e.response.data);
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
    }
  }
})

export const { setTodos } = todosSlice.actions;

// SELECTORS
export const selectAllTodos = state => state.todos.userTodos;

export default todosSlice.reducer;