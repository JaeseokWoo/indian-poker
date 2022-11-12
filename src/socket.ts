import { Server } from 'socket.io';

export default (server: any) => {
  const io = new Server(server, { path: '/socket.io' });

  io.on('connection', socket => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id);
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval((socket as any).interval);
    });
    socket.on('error', error => {
      console.error(error);
    });
    socket.on('reply', data => {
      console.log(data);
    });
    (socket as any).interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO');
    }, 3000);
  });
};
