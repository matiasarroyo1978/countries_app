import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import countriesReducer from '../reducer/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	countriesReducer,
	composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
