import {
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  SIGNUP,
} from '../../constants/action-types';
const users = [
  { email: 'nikola_tesla@electricity.com', password: '?1Aaaa' },
  { email: 'albert_einstein@relativity.com', password: '?1Aaaa' },
];
export const login = (enteredEmail, enteredPassword) => {
  const existingUSer = users.find(user => user.email === enteredEmail);
  if (!existingUSer) {
    throw new Error('User not found');
  } else {
    if (existingUSer.password === enteredPassword) {
      localStorage.setItem('email', JSON.stringify(enteredEmail));
      JSON.parse(localStorage.getItem('email'));
    }
  }
  return { type: LOGIN, payload: enteredEmail };
};

export const signIn = async email => {
  login();
  return async dispatch => {
    dispatch({ type: LOGIN, payload: email });
  };
};

export const logout = () => {
  return localStorage.clear();
};

export const signOut = () => async dispatch => {
  try {
    logout();
    dispatch({ type: LOGOUT });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, error: true });
  }
};
export const sign_up = (enteredEmail, enteredPassword, confirmedPassword) => {
  const existingUser = users.find(user => user.email === enteredEmail);
  if (existingUser) {
    throw new Error('User already exists');
  } else {
    if (enteredPassword !== confirmedPassword) {
      throw new Error("Passwords don't match");
    }
    localStorage.setItem('email', JSON.stringify(enteredEmail));
    users.push({ enteredEmail, enteredPassword, confirmedPassword });
    return { type: SIGNUP, payload: enteredEmail };
  }
};

export const signUp =
  (enteredEmail, enteredPassword, confirmedPassword) => dispatch => {
    sign_up(enteredEmail, enteredPassword, confirmedPassword);
    dispatch({ type: SIGNUP, payload: enteredEmail });
  };
