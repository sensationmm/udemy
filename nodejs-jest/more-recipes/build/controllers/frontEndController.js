'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../database/models');

var _models2 = _interopRequireDefault(_models);

var _mostFavorited = require('./../filters/mostFavorited');

var _mostFavorited2 = _interopRequireDefault(_mostFavorited);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller to handle the personal requests of the frontend
 *
 * @export
 * @class FrontEndController
 */
var FrontEndController = function () {
  function FrontEndController() {
    _classCallCheck(this, FrontEndController);
  }

  _createClass(FrontEndController, [{
    key: 'home',

    /**
     * Return data needed by the home page
     *
     * @param {object} req express request object
     * @param {object} res express response object
     *
     * @returns {object} json
     * @memberof FrontEndController
     */
    value: async function home(req, res) {
      var recipesMeta = await (0, _mostFavorited2.default)(1, 3);
      var mostFavoritedRecipes = recipesMeta.rows;
      // Get the latest recipes begin
      var latestRecipes = await _models2.default.Recipe.findAll({
        limit: 6,
        order: [['createdAt', 'DESC']],
        include: {
          model: _models2.default.User,
          attributes: { exclude: ['password'] }
        }
      });

      // Get the latest recipes end


      return res.sendSuccessResponse({
        mostFavoritedRecipes: mostFavoritedRecipes,
        latestRecipes: latestRecipes
      });
    }
  }]);

  return FrontEndController;
}();

exports.default = FrontEndController;