import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

import { NavLink, useHistory, useLocation } from "react-router-dom";
import { login, registration } from "../../http/userAPI";

const Auth = () => {
  const location = useLocation();
  const history = useHistory();
  const isLogin: boolean = location.pathname === "/login";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    username.length > 0 && password.length > 0
      ? setDisable(false)
      : setDisable(true);
  }, [username, password]);

  const enter = async (e: any) => {
    e.preventDefault();
    let data;
    try {
      if (isLogin) {
        data = await login(username, password);
      } else {
        data = await registration(username, password);
      }
      history.push("chat");
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  return (
    <div>
      {isLogin ? (
        <form className={styles.auth}>
          <h1>Авторизация</h1>
          <input
            type="text"
            id="login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите логин"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
          <button className="entry" onClick={enter} disabled={disable}>
            Войти
          </button>
          <NavLink className="change-action" to="registration">
            Зарегистрироваться
          </NavLink>
        </form>
      ) : (
        <form className={styles.auth}>
          <h1>Регистрация</h1>
          <input
            type="text"
            id="login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите логин"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
          <button className="entry" onClick={enter} disabled={disable}>
            Зарегистрироваться
          </button>
          <NavLink className="change-action" to="login">
            Авторизоваться
          </NavLink>
        </form>
      )}
    </div>
  );
};

export default Auth;
