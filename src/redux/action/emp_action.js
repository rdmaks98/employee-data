/* eslint-disable */
/* 

============ Basic Setup ============ 
*/
import {

    EMPLOYEE_LIST_FAIL,
    EMPLOYEE_LIST_REQUEST,
    EMPLOYEE_LIST_SUCCESS,
} from '../constant/index';
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


export const getEmployeeList = () => async (dispatch) => {
    try {
        debugger
        dispatch({ type: EMPLOYEE_LIST_REQUEST });
        const { data } = await axios.get(`http://172.16.16.185:2010/api/employee/list`);

        console.log("🚀 ~ createUser ~ data:", data)
        dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("🚀 ~ createUser ~ error:", error)
        debugger
        dispatch({
            type: EMPLOYEE_LIST_FAIL,
            payload: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
        });
    }
};
