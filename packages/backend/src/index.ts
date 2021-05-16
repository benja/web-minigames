import express from 'express';
import { SocketServer } from './socket-server';
import { api as v1 } from './routes/v1';
import cors from 'cors';

const app = express();

app.use('/api/v1', v1);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server is now running on http://localhost:8080');
});

new SocketServer(server);
