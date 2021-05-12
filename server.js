// Setup basic express server
const express = require("express");
const User = require("./models/users");
const Message = require("./models/chat");
const DB = require("./config/db");
const cors = require("cors");
const app = express();
const httpServer = require("http").createServer(app);

DB();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.json());
//create new
app.post("/api/newuser", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ data: user });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/alluser", async (req, res) => {
  try {
    const user = await User.find({
      socketId: { $ne: req.body.test },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/sendmessage", async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.json({ data: newMessage });
  } catch (error) {
    console.log(error);
  }
});
//get all messages
app.get("/getmessages", async (req, res) => {
  try {
    const message = await Message.find();
    res.json({ data: message });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/getconversations", async (req, res) => {
  const { from, to } = req.body;
  try {
    const messages = await Message.find({
      $or: [{ from: from }, { to: to }, { to: from }, { from: to }],
    });
    res.json({ data: messages });
  } catch (error) {
    console.log(error);
  }
});
let users = [];

const addUser = (userId, socketId) => {
  // users.map((user) => user.socketId === socketId) &&
  //   users.unshift({ userId, socketId });
  !users.some((user) => user.userId === userId) &&
    users.unshift({ userId, socketId });
};
const addnewUser = (userId) => {
  !users.some((user) => user.userId === userId) && users.unshift({ userId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const currentUser = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};
let data = new Date();
const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: data,
  };
};
let Bot = "Chat Bot";

io.on("connection", async (socket) => {
  let me;
  const senderId = socket.handshake.query;
  console.log(senderId);
  // socket.join(senderId);
  console.log(`connect: ${socket.id}`);
  // socket.emit("message", formatMessage(Bot, "Welcome to Chat Bot"));
  // socket.broadcast.emit(
  //   "message",
  //   formatMessage(Bot, "a user has joined the chat")
  // );
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
    io.emit("message", "A user has left the chat");
  });
  socket.on("chatMessage", (msg) => {
    console.log(msg);
    io.emit("message", formatMessage("USER", msg));
  });

  socket.on("addUser", (data) => {
    addUser(data, socket.id);
    // me = data;
    // addnewUser(data);
    console.log(users);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    const receiver = getUser(receiverId);
    const sender = currentUser(senderId);
    const newMessage = {
      from: sender.socketId,
      userFrom: sender.userId,
      to: receiver.socketId,
      userTo: receiver.userId,
      message: text,
    };
    const resp = await Message.create(newMessage);
    console.log(resp);
    io.to(receiver.socketId).to(sender.socketId).emit("message", {
      username: sender.userId,
      senderId: sender.socketId,
      text,
    });
  });
  // //when ceonnectbe lo le sor
  // console.log("a user connected.");

  // //take userId and socketId from user
  // socket.on("addUser", (userId) => {
  //   addUser(userId, socket.id);
  //   io.emit("getUsers", users);
  // });

  // //send and get message
  // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
  //   const user = getUser(receiverId);
  //   io.to(user.socketId).emit("getMessage", {
  //     senderId,
  //     text,
  //   });
  // });

  // //when disconnect
  // socket.on("disconnect", () => {
  //   console.log("a user disconnected!");
  //   removeUser(socket.id);
  //   io.emit("getUsers", users);
  // });
});

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log("Server listening at port %d", port);
});
