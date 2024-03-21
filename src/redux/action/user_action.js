/* eslint-disable */
/* 

============ Basic Setup ============ 
*/
import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  RESET_STATE,
  USER_CREATE_FAIL,
  USER_CREATE_SUCCESS,
  USER_CREATE_REQUEST,
} from '../constant/index';
// import axios from '../../utils/AxiosInterceptor';
import axios from 'axios';

/* 

======= Header Configuration =======

*/
const BASE_URL = process.env.NEXT_PUBLIC_API;
let tokenData;
if (typeof window !== 'undefined') {
  // Access localStorage here
  tokenData = localStorage.getItem('x-access-token')
    ? localStorage.getItem('x-access-token')
    : null;
}
const formHeader = {
  headers: {
    'Content-Type': 'multipart/form-data',
    authorization: `Bearer ${tokenData}`,
  },
};
const headerConfig = {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${tokenData}`,
  },
};

/* 

============ API Calling ===============
type: API Type will be called in Reducer

*/

export const loginUserWorker = (userData) => async (dispatch) => {
  debugger
  console.log("🚀 ~ loginUserWorker ~ userData:", userData)
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`https://b2b.codeintelli.in/api/v1/auth/login`, userData);
    localStorage.setItem('x-access-token', data.data.access_token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.data.loginData });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
    });
  }
};

// export const loadUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: LOAD_USER_REQUEST });
//     const bearerToken = Cookies.get('x-access-token')
//       ? Cookies.get('x-access-token')
//       : localStorage.getItem('x-access-token')
//         ? localStorage.getItem('x-access-token')
//         : null;

//     const { data } = await axios.get(`${BASE_URL}/user/me`, {
//       headers: {
//         authorization: `Bearer ${bearerToken}`,
//       },
//     });
//     dispatch({ type: LOAD_USER_SUCCESS, payload: data?.result });
//   } catch (error) {
//     dispatch({ type: LOAD_USER_FAIL, payload: error?.response?.data?.message });
//   }
// };

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('x-access-token');
    dispatch({ type: RESET_STATE });
    dispatch({ type: LOGOUT_SUCCESS, payload: 'Logout Successfully' });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: 'Something Error Occured' });
  }
};



// ===========Clearing Errors=================

// */
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
export const resetState = () => async (dispatch) => {
  dispatch({ type: RESET_STATE });
};



