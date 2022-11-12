import express from 'express';
import path from 'path';

import webSocket from './socket';

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log('here');
  res.json('test');
});

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

webSocket(server);
