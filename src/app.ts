import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import ColorHash from 'color-hash';
import cors from 'cors';

import webSocket from './socket';
import roomRouter from './routes/room';
import loginRouter from './routes/login';

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('rooms', []);

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || ('abc' as string),
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use((req, res, next) => {
  if (!(req.session as any).color) {
    const colorHash = new ColorHash();
    (req.session as any).color = colorHash.hex(req.sessionID);
  }
  console.log((req.session as any).color);
  next();
});

app.use('/login', loginRouter);
app.use('/room', roomRouter);

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

webSocket(server, app, sessionMiddleware);
