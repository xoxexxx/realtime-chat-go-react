import React from "react";
import { useState } from "react";
import Styles from "./Chat.module.css";
import go from '../../go.png'
import { connect, sendMsg } from "../../api";
export const Chat = () => {
  const [messages, setMessgae] = useState([]);
  const [value, setValue] = useState("");

  const send = () => {
    sendMsg(value);
    setValue("")
  };

  connect((msg) => {
    setMessgae([...messages, JSON.parse(msg.data)]);
  });

  let message = messages.map((msg, i) => <li key={i}>{msg.data}</li>);
  return (
    <div className={Styles.chatBlock}>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}> <img className={Styles.goImg} src={go} alt="go" />{msg.Body}</li>
        ))}
      </ul>

      <div className={Styles.sendMessage}>
        <input
        className={Styles.inputMessage}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
        className={Styles.btnSend}
        onClick={send}>send</button>
      </div>
    </div>
  );
};
