const mongoose = require("mongoose");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 8080;
const router = require("./router/router");
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users/users');
const { getTimestamp, capitalize } = require("./helpers/helpers") 
// const mongoUri = "mongodb://localhost/chat-app";
// const mongoParams = {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// };
// mongoose.connect(mongoUri, mongoParams, err => {
//   console.log(err || `Connected to MongoDB.`);
// });

// app.use(express.static("./client/public"));
app.use(router);

io.on("connection", socket => {
  console.log("connected");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    const timestamp = getTimestamp();

    socket.emit("newMessage", {
      user: "Admin",
      message: `${capitalize(user.name)}, Welcome To Room ${capitalize(user.room)}.`,
      timestamp
    });

    const broadcastObj = { user: "Admin", message: `${capitalize(user.name)} has joined!`, timestamp }
    socket.broadcast.to(user.room).emit("newMessage", broadcastObj);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    const timestamp = getTimestamp();

    io.to(user.room).emit('newMessage', { user: capitalize(user.name), message, timestamp });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    const timestamp = getTimestamp();

    if(user) {
      const departureObj = { user: "Admin", message: `${capitalize(user.name)} has left.`, timestamp }
      io.to(user.room).emit('newMessage', departureObj);
      // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  });
});

server.listen(port, () => console.log(`Listening on ${port}`));
