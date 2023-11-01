import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos';
import loginReducer from './login';

export const store = configureStore({
  reducer:{
    todos: todosReducer,
    login: loginReducer
  }
})
