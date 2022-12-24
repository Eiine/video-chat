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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//configuracion de coneccion

io.on("connection", function (socket) {
  console.log("connetado a soket: ", socket.id);
  socket.on("stream", function (canva) {
    let canvas = canva;
    socket.broadcast.emit("stream", canvas);
  });
});

server.listen(port, () => {
  console.log("server corriendo en " + port);
});
