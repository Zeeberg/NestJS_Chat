import axios from "axios";
import Cookies from "js-cookie";

const $host = axios.create({
  baseURL: "http://localhost:8080",
});

const $authHost = axios.create({
  baseURL: "http://localhost:8080",
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${Cookies.get("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
