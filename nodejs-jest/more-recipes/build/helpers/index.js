'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reWebUrl = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable */


exports.updateRecipeAttributes = updateRecipeAttributes;
exports.updateUserAttributes = updateUserAttributes;
exports.updateUserSettings = updateUserSettings;

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

var _redisClient = require('./redis-client');

var _redisClient2 = _interopRequireDefault(_redisClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper methods to use throughout the app
 */

/**
 * Check if an email is of valid format
 * @param {string} email the email to check validity for
 * @returns {bool} true or false
 */
var isValidEmail = function isValidEmail(email) {
  return (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
  );
};
var reWebUrl = exports.reWebUrl = new RegExp("^" +
// protocol identifier
"(?:(?:https?|ftp)://)" +
// user:pass authentication
"(?:\\S+(?::\\S*)?@)?" + "(?:" +
// IP address exclusion
// private & local networks
"(?!(?:10|127)(?:\\.\\d{1,3}){3})" + "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
// IP address dotted notation octets
// excludes loopback network 0.0.0.0
// excludes reserved space >= 224.0.0.0
// excludes network & broacast addresses
// (first & last IP address of each class)
"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
// host name
'(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
// domain name
'(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
// TLD identifier
'(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
// TLD may end with dot
"\\.?" + ")" +
// port number
"(?::\\d{2,5})?" +
// resource path
"(?:[/?#]\\S*)?" + "$", "i");

exports.default = isValidEmail;

/**
 * Updates the recipe attributes
 *
 * @param {any} sequelizeRecipe sequelize Recipe instance
 * @returns {Recipe} recipe with upvotes, downvotes and favorites attributes
 */

async function updateRecipeAttributes(sequelizeRecipe) {
  var recipe = sequelizeRecipe.get();

  var upvotersIds = await _redisClient2.default.smembers('recipe:' + recipe.id + ':upvotes');
  recipe.upvotersIds = upvotersIds;

  var downvotersIds = await _redisClient2.default.smembers('recipe:' + recipe.id + ':downvotes');
  recipe.downvotersIds = downvotersIds;

  var favoritersIds = await _redisClient2.default.smembers('recipe:' + recipe.id + ':favorites');
  recipe.favoritersIds = favoritersIds;

  var viewers = await _redisClient2.default.smembers('recipe:' + recipe.id + ':viewers');
  recipe.viewers = viewers;

  return recipe;
}

/**
 * Return updated users details
 * @param {obj} user
 * @param {obj} models
 * @return {obj} updated user
 */
async function updateUserAttributes(user, models) {
  var recipes = await models.Recipe.findAll({
    where: {
      userId: user.id
    }
  });

  user = user.get();
  user.recipes = recipes;
  delete user.password;

  return user;
}

/**
 * Return updated users settings
 * @param {obj} user
 * @param {obj} requestData
 * @return {obj} updated user
 */
async function updateUserSettings(user, requestData) {
  var newSettings = JSON.parse(user.settings);

  Object.entries(requestData).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (_config2.default.VALID_USER_SETTINGS.indexOf(key) !== -1) {
      console.log(value);
      if (Number(value) === 1 || Number(value) === 0) {
        newSettings[key] = Number(value);
      }
    }
  });

  user.settings = JSON.stringify(newSettings);
  await user.save();
  return newSettings;
}