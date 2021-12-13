import {
  BOOK_FETCH_ERROR,
  BOOK_FETCH_LOADING,
  BOOK_FETCH_LOADING_END,
  FETCH_BOOKS,
  DELETE_BOOK,
  DELETE_BOOK_LOADING,
  DELETE_BOOK_ERROR,
  CREATE_BOOK,
  CREATE_BOOK_LOADING,
  CREATE_BOOK_ERROR,
  UPDATE_BOOK_ERROR,
  UPDATE_BOOK_LOADING,
  UPDATE_BOOK,
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
    case CREATE_BOOK:
      return {
        ...state,
        books: state.books.concat(action.payload),
      };
    case CREATE_BOOK_LOADING:
      return { ...state, loading: true, error: false };
    case CREATE_BOOK_ERROR:
      return { ...state, loading: false, error: true };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case UPDATE_BOOK_LOADING:
      return { loading: true };
    case UPDATE_BOOK_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
export default booksReducer;
