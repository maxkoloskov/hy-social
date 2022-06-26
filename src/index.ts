import express from 'express';

const app = express();

app.use('*', (_, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(1337, () => {
  console.log('App started');
});
