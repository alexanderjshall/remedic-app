import { Express } from 'express';
import { createServer, Server } from 'http';
import * as socketio from 'socket.io';

export const setupSocketIO = (app : Express) : Server => {
  const httpServer = createServer(app);
  const io = new socketio.Server(httpServer, {cors: {origin: '*'}});

  io.on('connection', (socket: socketio.Socket) => {

    socket.on('join chat', (roomId: string) => {
      socket.join(roomId);
    });

    socket.on('doctor message', (roomId: string, msg: string) => {
      io.to(roomId).emit('doctor message', msg);
    });

    socket.on('patient message', (roomId: string, msg: string) => {
      io.to(roomId).emit('patient message', msg);
    });

    socket.on('leave consultation', (roomId:string) => {
      socket.leave(roomId);
    });

    socket.on('end consultation', (roomId: string) => {
      io.to(roomId).emit('leave consultation');
    });

  });

  return httpServer;
};
