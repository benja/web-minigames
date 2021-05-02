import express from 'express';
import { SocketServer } from './socket-server';

const app = express();

const server = app.listen(8080, () => {
  console.log('Server is now running on http://localhost:8080');
});

new SocketServer(server);
