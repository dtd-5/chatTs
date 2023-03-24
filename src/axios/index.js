import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://47.108.66.104:8088',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

instance.interceptors.request.use()
instance.interceptors.response.use()
export default instance