import {
  FETCH_BOOKS,
  BOOK_FETCH_LOADING,
  BOOK_FETCH_ERROR,
} from '../../constants/action-types';
import axios from 'axios';

const url = 'http://localhost:4000/api/books';

export const fetchBooks = () => axios.get(url);
export const getBooks = () => async dispatch => {
  try {
    dispatch({ type: BOOK_FETCH_LOADING });

    const { data } = await fetchBooks(url);
    await dispatch({ type: FETCH_BOOKS, data });
  } catch (error) {
    dispatch({ type: BOOK_FETCH_ERROR });
  }
};
