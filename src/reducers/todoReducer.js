import {
  GET_TODOS, DELETE_TODO, ADD_TODO, EDIT_TODO, SET_TODO,
} from '../actions/types';

const initialState = {
  todos: [
    {
      id: 1,
      title: 'My first todo',
      description: 'Do this do that',
      datetime: '',
    },
    {
      id: 2,
      title: 'My second todo',
      description: 'Do not do this do that instead',
      datetime: '2019-05-05T13:00',
    },
    {
      id: 3,
      title: 'My third todo',
      description: 'Do this then don\'t do that',
      datetime: '',
    },
  ],
  editTodo: {},
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    case SET_TODO:
      return {
        ...state,
        editTodo: action.payload,
      };
    default:
      return state;
  }
};

export default todos;
