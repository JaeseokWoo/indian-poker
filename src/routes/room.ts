import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('roomRouter / get');
  res.send(req.app.get('rooms'));
});

router.post('/', (req, res, next) => {
  console.log('roomRouter / post');
  const { title } = req.body;
  const { color: owner } = req.session as any;
  const rooms = req.app.get('rooms');

  req.app.set('rooms', [...rooms, { id: rooms.length + 1, title, owner }]);
  console.log(req.app.get('rooms'));
  res.send(true);
});

router.get('/room/:id', (req, res, next) => {
  const { id } = req.params;
  const room = req.app.get('rooms').find(({ id: roomId }: { id: any }) => roomId === id);

  return res.send(room);
});

export default router;
