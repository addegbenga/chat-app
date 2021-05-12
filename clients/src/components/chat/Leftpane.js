import React, { useContext } from "react";
import { SocketContext } from "../../context/socket";
export default function Leftpane({ onlineUsers, handleCurrent, messages }) {
  const socket = useContext(SocketContext);
  const msg = messages && messages.map((item) => item);
  return (
    <div
      className="leftcontainer"
      style={{
        width: "20%",
        height: "70vh",
        background: "green",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "20px", paddingTop: "5px", paddingBottom: "5px" }}>
        contact list
      </h1>
      <div
        style={{
          width: "100%",
          flex: "1",
          background: "orange",
          overflowY: "scroll",
        }}
      >
        <ul
          className="left-pane-ul"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {onlineUsers &&
            onlineUsers.map((item, index) => (
              <li key={index} onClick={() => handleCurrent(item)}>
                {item.socketId === socket.id ? "You" : item.userId}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
