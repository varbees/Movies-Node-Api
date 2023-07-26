import { __prod__ } from '../constants.js';

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.OriginalUrl}`);
  res.status(404).json({
    message: 'Error 404: API Endpoint Lost in Space 🌠',
  });
  // next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  } else if (err.code === 11000 && err.keyPattern.title) {
    statusCode = 409;
    message = 'Title with that name already Exists';
  } else if (
    err.message.includes(
      'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer'
    )
  ) {
    statusCode = 400;
    message = 'Invalid Id Format';
  }
  res.status(statusCode).json({ message, stack: __prod__ ? null : err.stack });
};

export { notFound, errorHandler };
