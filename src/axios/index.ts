import axios from "axios";

const instance = axios.create({
  baseURL: "http://47.108.66.104:8088",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use((config) => {
  if (localStorage.getItem("token") !== undefined)
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
instance.interceptors.response.use((res) => {
  return res.data;
},(err)=>{alert(err)});
export  default instance
