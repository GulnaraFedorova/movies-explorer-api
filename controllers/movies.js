const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(`${err.message}`));
      }
      return next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм по указанному _id не найден'));
      } else
        if (!movie.owner.equals(req.user._id)) {
          next(new ForbiddenError('Недостаточно прав для удаления'));
        }
      Movie.findByIdAndDelete(req.params.movieId)
        .then(() => res.send({ message: 'Фильм успешно удален' }))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new ValidationError('Ошибка, некорректный _id'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Фильм по указанному _id не найден'));
      } else {
        next(err);
      }
    });
};
