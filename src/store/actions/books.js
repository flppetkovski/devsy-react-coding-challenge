import axios from 'axios';

import {
  BOOK_FETCH_ERROR,
  BOOK_FETCH_LOADING,
  BOOK_FETCH_LOADING_END,
  DELETE_BOOK,
  DELETE_BOOK_ERROR,
  DELETE_BOOK_LOADING,
  FETCH_BOOKS,
} from '../../constants/action-types';

const url = 'http://localhost:4000/api/books';
export const fetchBooks = async () => await axios.get(url);
export const getBooks = () => async dispatch => {
  try {
    dispatch({ type: BOOK_FETCH_LOADING });
    const { data } = await fetchBooks();
    dispatch({ type: FETCH_BOOKS, payload: data });
    console.log(data);
    dispatch({ type: BOOK_FETCH_LOADING_END });
  } catch (error) {
    dispatch({ type: BOOK_FETCH_ERROR, loading: null, error: true });
  }
};

export const deleteABook = async id => await axios.delete(`${url}/${id}`);
export const deleteBook = id => async dispatch => {
  try {
    dispatch({ type: DELETE_BOOK_LOADING });
    await deleteABook(id);

    dispatch({ type: DELETE_BOOK, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_BOOK_ERROR });
  }
};
