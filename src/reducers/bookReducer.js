import {
  BOOK_FETCH_ERROR,
  BOOK_FETCH_LOADING,
  BOOK_FETCH_LOADING_END,
  FETCH_BOOKS,
  DELETE_BOOK,
  DELETE_BOOK_LOADING,
  DELETE_BOOK_ERROR,
} from '../constants/action-types';

const booksReducer = (state = { isLoading: false, books: [] }, action) => {
  switch (action.type) {
    case BOOK_FETCH_LOADING:
      return { ...state, isLoading: true };
    case BOOK_FETCH_LOADING_END:
      return { ...state, isLoading: false };
    case FETCH_BOOKS:
      return {
        ...state,
        isLoading: false,
        books: action.payload,
      };
    case BOOK_FETCH_ERROR:
      return { ...state, error: true };
    case DELETE_BOOK_LOADING:
      return { ...state, loading: true };
    case DELETE_BOOK:
      return { ...state };
    case DELETE_BOOK_ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
};
export default booksReducer;
