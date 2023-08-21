const express = require('express');
const router = express.Router();
const Movie = require('../models/Movies');
const Genre = require('../models/Genres');

// Create a new movie

//  new movie has been edited
router.post('/movie', async (req, res) => {
  try {
    const { name, description, genreId, releaseDate } = req.body;

    // Check if the provided genreId exists
    const genreExists = await Genre.find({name:genreId});
    if (!genreExists) {
      return res.status(400).json({ error: 'Invalid genreId' });
    }
    const genre_upd = mongoose.Types.ObjectId(genreId);
    const newMovie = new Movie({
        name,
        description,
        genre: genre_upd , // Use the ObjectId directly
        releaseDate,
      });

    console.log(newMovie);
    const savedMovie = await newMovie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create movie' });
  }
});


// Update a movie


// User can update the movie
router.put('/:movieId', async (req, res) => {
    try {
      const { name, description, genreId, releaseDate } = req.body;
      const movieId = req.params.movieId;
  
      // Check if the provided genreId exists
      const genre = await Genre.findById(genreId);
      if (!genre) {
        return res.status(400).json({ error: 'Invalid genreId' });
      }
  
      // Update movie details
      const updatedMovie = await Movie.findByIdAndUpdate(
        movieId,
        {
          name,
          description,
          releaseDate,
        },
        { new: true } // Returns the updated document
      );
  
      if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update movie' });
    }
  });


// get all the movies differnt aspects
  router.get('/', async (req, res) => {
    try {
      let query = {};
  
      if (req.query.name) {
        query.name = { $regex: req.query.name, $options: 'i' };
      }
  
      if (req.query.releaseDate) {
        query.releaseDate = req.query.releaseDate;
      }
  
      const movies = await Movie.find(query);
  
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve movies' });
    }
  });


//    users can post the reviews

  router.post('/:movieId/reviews', async (req, res) => {
    try {
      const movieId = req.params.movieId;
      const { comment, rating } = req.body;
  
      const updatedMovie = await Movie.findByIdAndUpdate(
        movieId,
        { $push: { reviews: { comment, rating } } },
        { new: true }
      );
  
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add review' });
    }
  });


//  users can check the revies posted by users

  router.get('/:movieId/reviews', async (req, res) => {
    try {
      const movieId = req.params.movieId;
      console.log('Movie ID:', movieId);
  
      const movie = await Movie.findById(movieId);
      console.log('Movie:', movie);
  
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      res.json(movie.reviews);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });




module.exports = router;
