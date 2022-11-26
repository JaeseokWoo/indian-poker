import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('router /');
  res.send(req.app.get('rooms'));
});

export default router;
