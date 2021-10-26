import mongoose from 'mongoose';
import app from './server';
import { environment } from './environment';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

mongoose
  .connect(environment.DB_URI as string)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${environment.PORT}`);
    });
  });
