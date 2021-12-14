import axios from 'axios';

import {
  BOOK_FETCH_ERROR,
  BOOK_FETCH_LOADING,
  BOOK_FETCH_LOADING_END,
  CREATE_BOOK,
  CREATE_BOOK_ERROR,
  CREATE_BOOK_LOADING,
  DELETE_BOOK,
  DELETE_BOOK_ERROR,
  DELETE_BOOK_LOADING,
  FETCH_BOOKS,
  FETCH_TAGS,
  UPDATE_BOOK,
  UPDATE_BOOK_ERROR,
} from '../../constants/action-types';

const url = 'http://localhost:4000/api/books';
export const fetchBooks = async () => await axios.get(url);
export const getBooks = () => async dispatch => {
  try {
    dispatch({ type: BOOK_FETCH_LOADING });
    const { data } = await fetchBooks();
    dispatch({ type: FETCH_BOOKS, payload: data });
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

export const createBook = data => axios.post(url, data);
export const createABook = book => async dispatch => {
  try {
    dispatch({ type: CREATE_BOOK_LOADING });
    const { data } = await createBook(book);
    dispatch({ type: CREATE_BOOK, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_BOOK_ERROR });
  }
};
export const updateBook = async (id, updatatedBook) => {
  return axios.put(`http://localhost:4000/api/books/${id}`, updatatedBook);
};
export const updateABook = (id, book) => {
  return async dispatch => {
    const { data } = await updateBook(id, book);
    try {
      dispatch({ type: UPDATE_BOOK, payload: data });
    } catch (error) {
      dispatch({ type: UPDATE_BOOK_ERROR });
    }
  };
};
export const getTags = async () => {
  return axios.get('http://localhost:4000/api/tags');
};
export const fetchTags = async () => {
  return async dispatch => {
    let tags = [];
    const { data } = await getTags();
    tags = Object.keys(data);
    return dispatch({ type: FETCH_TAGS, payload: tags });
  };
};
