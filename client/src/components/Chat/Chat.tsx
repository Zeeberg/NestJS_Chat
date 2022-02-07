import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { WS } from "../../http/socket";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Chat = () => {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    WS.emit("reload");
  }, []);

  useEffect(() => {
    message.length > 0 ? setBtnDisabled(false) : setBtnDisabled(true);
    WS.on("init", (message: any) => {
      setMessages(message);
    });
  }, [message, messages, setMessages]);

  const loginInfo: any = jwtDecode(`${Cookies.get("token")}`);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    WS.emit("msgToServer", {
      content: message,
      author: loginInfo.login,
    });
    setMessage("");
  };

  const logOut = () => {
    Cookies.remove("token");
    history.push("login");
  };

  return (
    <div className={styles["chat-wrapper"]}>
      <div className={styles["user-info"]}>
        <p className="user-info__name">
          Поллзователь <b>{loginInfo.login}</b>
        </p>

        <button className="log-out" onClick={logOut}>
          Выйти
        </button>
      </div>
      <div className="chat">
        {!messages.length ? (
          <div className="messages">Сообщений нет!</div>
        ) : (
          <div className="messages">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className={
                  message.author === loginInfo.login
                    ? styles["messages__info_own"]
                    : styles["messages__info"]
                }
              >
                <span className="author">{message.author}</span>
                {message.content}
              </div>
            ))}
          </div>
        )}
        <form className={styles.control}>
          <input
            type="text"
            id="message-text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение"
          />
          <button
            onClick={sendMessage}
            disabled={btnDisabled}
            id="send-message-text"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
