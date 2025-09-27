import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import { app } from './app';
import { AppDataSource } from './shared/data-source';
import { bootstrap } from './shared/bootstrap';

const PORT = Number(process.env.PORT || 3000);

async function main() {
  try {
    await AppDataSource.initialize();
    await bootstrap(); 
    app.listen(PORT, () => {
      console.log(`[movies-api] listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error initializing app:', err);
    process.exit(1);
  }
}

main();