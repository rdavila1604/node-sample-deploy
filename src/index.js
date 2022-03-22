import app from "./app";
import { Server as WebsocketServer } from "socket.io";
import http from 'http';
import sockets from "./sockets";
import { PORT } from "./config";

import { connectDB } from "./db";

connectDB();

const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log('Server is running on port', PORT);

const io = new WebsocketServer(httpServer);
sockets(io);