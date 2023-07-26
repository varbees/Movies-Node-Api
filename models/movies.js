class Movie {
  constructor(data) {
    this.title = data.title;
    this.year = data.year;
    this.rating = data.rating;
    this.genres = data.genres;
  }

  validate() {
    const allowedGenres = [
      'Drama',
      'Action',
      'Comedy',
      'Crime',
      'Adventure',
      'Fantasy',
      'Biography',
      'History',
      'Sci-Fi',
      'Comedy',
      'War',
      'Mystery',
      'Thriller',
      'Western',
      'Romance',
      'Horror',
      'Animation',
    ];
    if (typeof this.title !== 'string' || this.title.length <= 2) {
      return 'Title must be longer than 2 characters';
    }

    if (
      !Number.isInteger(this.year) ||
      this.year < 1900 ||
      this.year > new Date().getFullYear()
    ) {
      return 'Invalid year';
    }

    if (
      typeof this.rating !== 'number' ||
      this.rating < 0 ||
      this.rating > 10
    ) {
      return 'Rating must be an integer between 0 and 10';
    }

    if (
      !Array.isArray(this.genres) ||
      this.genres.some(genre => !allowedGenres.includes(genre))
    ) {
      return 'Invalid genre';
    }

    return null; // Validation passed
  }
}

export { Movie };
