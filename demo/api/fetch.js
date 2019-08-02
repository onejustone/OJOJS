import axios from 'axios';
import humps from 'humps';

const fetch = axios.create({
  timeout: 30000
});

fetch.interceptors.response.use(
  response => {
    const res = response;
    if (res.status !== 200) {
      console.error(res.error);
      return Promise.reject(res.error);
    }
    return Promise.resolve(humps.camelizeKeys(res.data));
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  });

export default fetch;
