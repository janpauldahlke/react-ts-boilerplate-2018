import axios, {AxiosInstance} from 'axios';
import { RootState } from '../RootState';
//import authService from '../services/authenticationService';

const ax = (state: RootState): AxiosInstance => {
  const baseURL = process.env.REACT_APP_EXAMPLE;
  //const auth = authService(state);
 
  return axios.create({
    baseURL,          //condense key:value
    timeout: 5000,
    headers: {
      // 'Authentication': auth
    }
  });
};

export default ax;