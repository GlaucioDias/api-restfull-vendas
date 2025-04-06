import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

const PORT = process.env.PORT || 3334;

dataSource.initialize().then(() => {
  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}! 🏆`),
  );
});
