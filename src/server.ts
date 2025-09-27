import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import { AppDataSource } from './shared/data-source';
import { bootstrap } from './shared/bootstrap';

const PORT = Number(process.env.PORT || 3000);

async function main() {
    const isProd = process.env.NODE_ENV === 'production';
  try {
   if (isProd) {
      if (process.env.DATABASE_URL) {
        await AppDataSource.initialize();
        console.log('DB initialized with DATABASE_URL');
        await bootstrap();
      } else {
        console.log('No DATABASE_URL on Heroku. Skipping DB initialization for now.');
      }
    } else {
 
      await AppDataSource.initialize();
      await bootstrap();
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[movies-api] listening on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Error initializing app:', err);
    process.exit(1);
  }
}
main();
