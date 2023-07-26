import express from 'express';
import { connectDB } from './config/db.js';
import { __port__, __prod__ } from './constants.js';
import router from './routes/movieRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

const intializeServer = async () => {
  try {
    await connectDB();
    app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));

    app.use('/api', router);

    app.get('/', (req, res) => {
      if (!__prod__) {
        res.send('Movies Node API');
      }
    });

    app.use(notFound);
    app.use(errorHandler);

    app.listen(__port__, () => console.log(`Server Running on ${__port__}`));
  } catch (err) {
    console.log('Error connecting to MongoDB:', err?.message);
  }
};

intializeServer();
