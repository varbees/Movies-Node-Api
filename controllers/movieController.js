import { ObjectId } from 'mongodb';
import { getMoviesCollection } from '../config/db.js';
import { Movie } from '../models/movies.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a movie in db
// route    POST /api/add-movie
const createMovie = asyncHandler(async (req, res) => {
  const movieData = req.body;
  const movie = new Movie(movieData);

  const validationErrors = movie.validate();
  if (validationErrors) {
    res.status(400);
    throw new Error(validationErrors);
  }

  const Movies = await getMoviesCollection();
  const result = await Movies.insertOne({
    title: movie.title,
    year: movie.year,
    genres: movie.genres,
    rating: movie.rating,
  });
  const insertedMovieId = result.insertedId;
  const inseretedMovie = await Movies.findOne({
    _id: insertedMovieId,
  });
  res.status(201).json(inseretedMovie);
});

// @desc    Fetch all the movies stores in the database.
// route    GET /api/get-all
const getMovies = asyncHandler(async (req, res) => {
  const Movies = await getMoviesCollection();
  const movies = await Movies.find().toArray();
  res.status(200).json({ count: movies.length, movies });
});

// @desc    Fetch a movie by id.
// route    GET /api/get-single?id={id}
const getMovie = asyncHandler(async (req, res) => {
  const movieId = req.query.id;
  const Movies = await getMoviesCollection();
  const movie = await Movies.findOne({ _id: new ObjectId(movieId) });
  if (!movie) {
    throw new Error(`Movie not with found with id: ${movieId}`);
  }
  res.status(200).json(movie);
});

// @desc    Fetch Movies Based on required Pagination.
// route    GET /get-paginated?page={page}&size={size}
const getPaginated = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 5;
  //calc needed values
  const pagination = {};
  const startIndex = (page - 1) * size;
  const endIndex = page * size;

  const Movies = await getMoviesCollection();
  const totalMovies = await Movies.countDocuments();
  const movies = await Movies.find().skip(startIndex).limit(size).toArray();

  //display remaining pages on both sides of current page in pagination
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      size,
    };
  }

  if (endIndex < totalMovies) {
    pagination.next = {
      page: page + 1,
      size,
    };
  }

  res.status(200).json({
    count: movies.length,
    pagination,
    movies: movies,
  });
});

export { createMovie, getMovies, getMovie, getPaginated };
