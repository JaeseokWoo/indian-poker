import { Express, RequestHandler, Request, NextFunction, Response } from 'express';
import { Server, Socket } from 'socket.io';
import ios from 'express-socket.io-session';

export default (server: any, app: Express, sessionMiddleware: RequestHandler) => {
  const io = new Server(server, {
    path: '/socket.io',
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  const wrap = (middleware: any) => (socket: Socket, next: any) => middleware(socket.request, {} as Response, next);
  app.set('io', io);
  const gameRooms = io.of('/gameRooms');
  const chat = io.of('/chat');
  io.use(wrap(sessionMiddleware));
  // chat.use(wrap(sessionMiddleware));

  gameRooms.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    const roomId = socket.handshake.query.roomId;
    socket.join(roomId as string);
    console.log(((req as any).session as any)?.color);
    socket.to(roomId as string).emit('join', {
      userId: ((req as Request).session as any)?.color,
    });

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId as string);
    });
  });

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id);
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval((socket as any).interval);
    });
    socket.on('error', (error) => {
      console.error(error);
    });
    socket.on('reply', (data) => {
      console.log(data);
    });
    (socket as any).interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO');
    }, 3000);
  });
};
