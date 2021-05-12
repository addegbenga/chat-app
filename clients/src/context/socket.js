import React from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
export const SocketContext = React.createContext();
const jsonValue = localStorage.getItem("whatsapp-clone");
console.log(jsonValue)
export let socket = io(ENDPOINT, { autoConnect: false });
