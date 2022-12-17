import express from "express";
const app = express();
const port = 3001;
import { Server as SocketIO } from "socket.io";
import http from "http";
import { Stream } from "stream";

const server = http.createServer(app);
const io = new SocketIO(server);

//configuracion de archivos staticos
app.use(express.static("./src/public"));

//configuracion de coneccion

io.on("connection", function (socket) {
  console.log("hola");
  socket.on("stream", function (stream) {
    console.log("perra");
    socket.broadcast.emit("stream", stream);
  });
});

server.listen(port, () => {
  console.log("server corriendo en " + port);
});
