import jwtDecode from "jwt-decode";
import { $host } from "./index";
import Cookies from "js-cookie";

export const registration = async (login: string, password: string) => {
  const { data } = await $host.post("/auth/registration", { login, password });
  Cookies.set("token", data.token, { secure: true });
  return jwtDecode(data.token);
};

export const login = async (login: string, password: string) => {
  const { data } = await $host.post("/auth/login", { login, password });
  Cookies.set("token", data.token, { secure: true });
  return jwtDecode(data.token);
};
