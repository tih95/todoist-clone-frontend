import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: []
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    }
  }
})

export const { setTodos, addTodo } = todosSlice.actions;

// SELECTORS
export const selectTodos = state => state.todos.todos;

export default todosSlice.reducer;