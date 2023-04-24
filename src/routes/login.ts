import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ id: (req.session as any).color });
});

export default router;
