import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';

const initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools());

export default store;
