import express from 'express';
import { SocketServer } from './socket-server';
import { api as v1 } from './routes/v1';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: ['*'],
    optionsSuccessStatus: 200,
    // credentials: true,
  }),
);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server is now running on http://localhost:8080');
});

app.use('/api/v1', v1);

new SocketServer(server);
