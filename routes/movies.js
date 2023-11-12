const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validURL } = require('../utils/constants');

const {
  getMovies,
  deleteMovie,
  addMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(validURL).required(),
    trailerLink: Joi.string().regex(validURL).required(),
    thumbnail: Joi.string().regex(validURL).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

module.exports = router;
