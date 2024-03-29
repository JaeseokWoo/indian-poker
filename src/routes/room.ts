import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send(req.app.get('rooms'));
});

router.post('/', (req, res, next) => {
  const { title } = req.body;
  const { color: owner } = req.session as any;
  const rooms = req.app.get('rooms');
  const newRoom = { id: rooms.length + 1, title, owner };
  req.app.set('rooms', [...rooms, newRoom]);
  const io = req.app.get('io');
  io.of('/room').emit('newRoom', newRoom);
  res.send(true);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const room = req.app.get('rooms').find(({ id: roomId }: { id: any }) => roomId === Number(id));

  return res.json(room);
});

export default router;
