import {
  GET_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO, SET_TODO,
} from './types';

export const getTodos = () => ({ type: GET_TODOS });

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const editTodo = (todos) => {
  return {
    type: EDIT_TODO,
    payload: todos,
  };
};

export const setTodo = (todo) => {
  return {
    type: SET_TODO,
    payload: todo,
  };
};
