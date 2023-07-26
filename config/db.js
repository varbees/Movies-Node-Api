import colors from 'colors';
import { MongoClient } from 'mongodb';
import { __db__ } from '../constants.js';

let moviesCollection;

const client = new MongoClient(__db__, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const timeout = 2000;

const connectDB = async () => {
  try {
    const mongoConn = await client.connect({ SocketTimeoutMS: timeout });
    const db = await mongoConn.db();
    moviesCollection = await db.collection('movies');
    await moviesCollection.createIndex({ title: 1 }, { unique: true });

    console.log('MONGODB Connected...'.green.italic);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err?.message);
  }
};

const getMoviesCollection = () => {
  return moviesCollection;
};

export { connectDB, getMoviesCollection };
