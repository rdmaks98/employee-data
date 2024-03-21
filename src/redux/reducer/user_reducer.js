/* eslint-disable */
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  RESET_STATE,
  USER_CREATE_REQUEST,
  USER_CREATE_FAIL,
  USER_CREATE_SUCCESS,
} from '../constant/index';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return { isLoading: true };

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        isLoading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case RESET_STATE:
      return {
        isLoading: false,
        isAuthenticated: false,
        rehydrated: false,
        user: null,
      };
    default:
      return state;
  }
};
