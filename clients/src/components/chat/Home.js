import React, { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../context/socket";
import axios from "axios";

import Rightpane from "./Rightpane";
// import "../../App.css";
import Leftpane from "./Leftpane";
import "./style.css";

function Home({ id }) {
  const socket = useContext(SocketContext);

  const [messages, setMessages] = useState([]);
  const [received, setReceived] = useState([]);
  const [prevMsg, setPrevMsg] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
      // : setReceived((prev) => [...prev, data]);

      // setMessages((prev) => [...prev, data]);
    });
    socket.on("disconnect", (data) => {
      console.log(data);
    });

    socket.on("getUsers", (data) => {
      setOnlineUsers(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  });

  const handleCurrent = async (userId) => {
    try {
      const form = {
        from: socket.id,
        to: userId.socketId,
      };
      const conversations = await axios.post("/api/getconversations", form);
      setPrevMsg(conversations.data.data);
      console.log(prevMsg);
      const resp = onlineUsers.find((item) => item.userId === userId.userId);
      setCurrentUser(resp);
      setMessages([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>{id && id}</h1>
      <header>
        <p>Joined chat</p>
      </header>
      <div className="pane-container">
        <Leftpane
          onlineUsers={onlineUsers}
          handleCurrent={handleCurrent}
          messages={messages}
        />
        <Rightpane
          messages={messages}
          prevMsg={prevMsg}
          receivedMsg={received}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}

export default Home;
