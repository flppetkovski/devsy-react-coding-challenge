import axios from 'axios';
import {
  BOOK_FETCH_ERROR,
  BOOK_FETCH_LOADING,
  FETCH_BOOKS,
} from '../constants/action-types';
const api = axios.get({ baseURL: 'http://localhost:4000' });
export const getBooks = () => async dispatch => {
  try {
    dispatch({ type: BOOK_FETCH_LOADING, payload: null, error: null });
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_BOOKS, payload: data });
  } catch (error) {
    dispatch({ type: BOOK_FETCH_ERROR, loading: null, error: true });
  }
};
