import React, { useState, useContext } from "react";
import "./style.css";
import { SocketContext } from "../../context/socket";
export default function Rightpane({
  messages,
  currentUser,
  receivedMsg,
  prevMsg,
}) {
  const socket = useContext(SocketContext);
  const [data, setData] = useState({
    message: "",
  });
  const check = prevMsg.find((item) => item.from);

  const { message } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    const form = {
      senderId: socket.id,
      receiverId: currentUser.userId,
      text: message,
    };
    socket.emit("sendMessage", form);
    setData({
      message: "",
    });
  };
  return (
    <div
      className="rightpane-container"
      style={{ width: "50%", height: "70vh", background: "red" }}
    >
      <div
        className="chatbox-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "70vh",
        }}
      >
        <header
          style={{
            fontSize: "20px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          start chating with {currentUser.userId}
        </header>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "gray",
            overflowY: "scroll",
            height: "100%",
            // justifyContent: "space-between",
          }}
        >
          <>
            {prevMsg &&
              prevMsg.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "blue",
                    width: "40%",
                    marginBottom: "0.3rem",
                  }}
                >
                  <div
                    style={{
                      background: item.from === socket.id ? "white" : "orange",
                    }}
                  >
                    <p>
                      {item.userFrom} {item.time}
                    </p>
                    <p>{item.message}</p>
                  </div>
                </div>
              ))}
            {messages &&
              messages.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "blue",
                    width: "40%",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.senderId === socket.id ? (
                    <div style={{ background: "white" }}>
                      <p>
                        {item.senderId === socket.id ? "You" : item.username}{" "}
                        {item.time}
                      </p>
                      <p>{item.text}</p>
                    </div>
                  ) : (
                    <div style={{ background: "orange" }}>
                      <p>
                        {item.username} {item.time}
                      </p>
                      <p>{item.text}</p>
                    </div>
                  )}
                </div>
              ))}
          </>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <input
            style={{ flex: "1" }}
            type="text"
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Enter your message"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
