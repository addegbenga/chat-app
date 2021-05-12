import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { v4 as uuidV4 } from "uuid";

export default function Landing({ id, onClickId }) {
  const socket = useContext(SocketContext);
  const idRef = useRef();
  const [data, setData] = useState({
    username: "",
  });
  const { username } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    //emit data to the backend
    socket.auth = { username };
    socket.emit("addUser", username);
    onClickId(idRef.current.value);
    socket.connect();
  };
  const createId = () => {
    onClickId(uuidV4());
    socket.connect();
  };
  return (
    <div>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="enter your username"
        value={username}
        ref={idRef}
      />
      <button onClick={handleSubmit}>
        <Link to="/home"> Submit username</Link>
      </button>
      <button onClick={createId}>
        <Link to="/home"> Create a new id</Link>
      </button>
    </div>
  );
}
