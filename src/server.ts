import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Server is running at port ${config.port}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

main();
