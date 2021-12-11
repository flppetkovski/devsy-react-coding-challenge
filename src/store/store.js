import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import books from '../reducers';
export const store = createStore(books, {}, compose(applyMiddleware(thunk)));
