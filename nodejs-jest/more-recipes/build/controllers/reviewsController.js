'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

var _redis = require('../config/redis');

var _redis2 = _interopRequireDefault(_redis);

var _models = require('../database/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller to handle all reviews for recipes
 * @export ReviewsController
 * @class ReviewsController
 */
var ReviewsController = function () {
  function ReviewsController() {
    _classCallCheck(this, ReviewsController);
  }

  _createClass(ReviewsController, [{
    key: 'index',

    /**
     * Get all reviews for a recipe
     * @param {object} req express request object
     * @param {object} res express response object
     *
     * @returns {array} array of recipes
     * @memberof ReviewsController
     */
    value: async function index(req, res) {
      var recipe = req.currentRecipe;

      var reviews = await recipe.getReviews({
        include: { model: _models2.default.User, attributes: { exclude: ['password'] } }
      });

      return res.sendSuccessResponse({ reviews: reviews });
    }

    /**
     * Store a new review to the database
     * @param {object} req express request object
     * @param {object} res express response object
     *
     * @returns {object} json of newly saved review
     * @memberof ReviewsController
     */

  }, {
    key: 'create',
    value: async function create(req, res) {
      var currentRecipe = req.currentRecipe,
          authUser = req.authUser;

      var user = currentRecipe.User;

      var createdReview = await _models2.default.Review.create({
        review: req.body.review,
        recipeId: currentRecipe.id,
        userId: authUser.id
      });

      var review = await _models2.default.Review.findById(createdReview.id, {
        include: { model: _models2.default.User, exclude: ['password'] }
      });

      var recipeCreatorSettings = JSON.parse(user.settings);
      if (recipeCreatorSettings.reviewEmails === Number(1)) {
        // queue an email to the recipe creator for sending later
        var queue = _kue2.default.createQueue(process.env.NODE_ENV === 'production' ? _redis2.default.production : { redis: _redis2.default[process.env.NODE_ENV] });

        //  Register a new mails job to the queue
        queue.create('mails', {
          recipient: user,
          message: {
            subject: authUser.name + ' commented on your recipe.'
          },
          template: {
            pug: 'welcome',
            locals: {
              name: user.name,
              reviewer: authUser.name,
              review: review.review,
              recipe: currentRecipe,
              recipeTitle: currentRecipe.title,
              link: 'https://bahdcoder-more-recipes.herokuapp.com/recipe/' + currentRecipe.id
            }
          }
        }).events(false).save();
      }

      return res.sendSuccessResponse({ review: review });
    }
  }]);

  return ReviewsController;
}();

exports.default = ReviewsController;