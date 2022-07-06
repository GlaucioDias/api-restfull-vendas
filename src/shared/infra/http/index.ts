import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

const PORT = process.env.PORT || 3301;

dataSource.initialize().then(() => {
  const server = app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}! 🏆`),
  );
});
