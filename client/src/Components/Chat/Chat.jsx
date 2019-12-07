import React, { useState, useEffect } from "react";
import Message from "../Message/Message";
import socketIOClient from "socket.io-client";
import Header from "../Header/Header";
import queryString from "query-string";
import {capitalize} from "../../helpers/helpers"

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const socketEndpoint = "https://sk-chat-app-server.herokuapp.com/";

  const [data, setData] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = socketIOClient(socketEndpoint);

    setRoom(room);
    setName(capitalize(name));

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [socketEndpoint, location.search]);

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  useEffect(() => {
    socket.on("newMessage", message => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages]);

  //   useEffect(() => {
  //     fetch("/messages")
  //       .then(res => res.json())
  //       .then(dbMessages => setMessages([...dbMessages]));
  //   }, []);

  return (
    <>
      <Header name={name} room={room} />
      <div className="messages-container">
        {messages.map(messageObject => {
          return <Message messageObject={messageObject} name={name} />;
        })}
      </div>

      <form className="form">
        <input
          type="text"
          name="message"
          onChange={e => setMessage(e.target.value)}
          className="message-input"
        />
        <input
          type="submit"
          value="Send"
          className="send-button"
          onClick={sendMessage}
        />
      </form>
    </>
  );
};

export default Chat;
