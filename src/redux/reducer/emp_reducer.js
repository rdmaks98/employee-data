/* eslint-disable */
import {
    EMPLOYEE_LIST_REQUEST,
    EMPLOYEE_LIST_FAIL,
    EMPLOYEE_LIST_SUCCESS,
} from '../constant/index';

export const empReducer = (state = "", action) => {
    switch (action.type) {
        case EMPLOYEE_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case EMPLOYEE_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                emp_list: action.payload,
            }; case EMPLOYEE_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                emp_list: action.payload,
            };
        default:
            return state;
    }
};
