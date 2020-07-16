import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import todosReducer from '../features/todos/todosSlice';
import projectsReducer from '../features/projects/projectsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
    projects: projectsReducer
  },
});
