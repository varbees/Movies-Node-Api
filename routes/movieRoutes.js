import express from 'express';
import {
  createMovie,
  getMovies,
  getMovie,
  getPaginated,
} from '../controllers/movieController.js';

const router = express.Router();

router.post('/add-movie', createMovie);

router.get('/get-all', getMovies);

router.get('/get-single', getMovie);

router.get('/get-paginated', getPaginated);

export default router;
