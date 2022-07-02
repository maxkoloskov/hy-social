import 'dotenv/config';
import express from 'express';

const app = express();

app.use('*', (_, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const APP_PORT = process.env.APP_PORT || 3000;

app.listen(APP_PORT, () => {
  console.log(`App started at http://localhost:${APP_PORT}`);
});
