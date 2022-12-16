import express from "express";
const app = express();
const port = 3001;
import { Server as SocketIO } from "socket.io";
import http from "http";

const server = http.createServer(app);
const io = new SocketIO(server);

//configuracion de archivos staticos
app.use(express.static("./src/public"));

//configuracion de coneccion

io.on("connection", () => {
  console.log("nueva coneccion");
});

server.listen(port, () => {
  console.log("server corriendo en " + port);
});
