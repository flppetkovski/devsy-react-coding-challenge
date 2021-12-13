import { LOGIN, LOGIN_ERROR, LOGOUT, SIGNUP } from '../constants/action-types';
const authReducer = (state = { loggedInUser: [] }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedInUser: state.loggedInUser.concat(action.payload),
      };
    case LOGIN_ERROR:
      return { ...state, error: true };
    case LOGOUT:
      return { ...state, user: null };
    case SIGNUP:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
