/* eslint-disable */
import axios from 'axios';

const BASE_URL = 'http://172.16.16.185:2010/api';


let tokenData;

if (typeof window !== 'undefined') {
  tokenData =
    localStorage.getItem('x-access-token')
      ? localStorage.getItem('x-access-token')
      : null;
}

const headerConfig = {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${tokenData}`,
  },
};

const formHeader = {
  headers: {
    'Content-Type': 'multipart/form-data',
    authorization: `Bearer ${tokenData}`,
  },
};

const EmployeeHandler = {
  async creatEmployee(payload) {
    debugger
    try {
      const { data } = await axios.post(`${BASE_URL}/employee/create`, payload, headerConfig);
      return data;
    } catch (error) {
      return error.response?.data;
    }
  },
  async editEmployee(id, payload) {
    debugger
    try {
      const { data } = await axios.put(`${BASE_URL}/employee/update/${id}`, payload, headerConfig);
      return data;
    } catch (error) {
      return error.response?.data;
    }
  },
};
export default EmployeeHandler;
