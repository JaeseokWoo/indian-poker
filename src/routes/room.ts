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

  req.app.set('rooms', [...req.app.get('rooms'), { title, owner }]);
  console.log(req.app.get('rooms'));
  res.redirect('/');
});

export default router;
