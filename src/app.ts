import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import ColorHash from 'color-hash';

import webSocket from './socket';

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET as string,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use((req, res, next) => {
  if (!(req.session as any).color) {
    const colorHash = new ColorHash();
    (req.session as any).color = colorHash.hex(req.sessionID);
  }
  next();
});

app.use((req, res, next) => {
  console.log('here');
  res.json('test');
});

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

webSocket(server, app);
