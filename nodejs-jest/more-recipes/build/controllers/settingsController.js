'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./../helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Manage user settings
 */
var SettingsController = function () {
  function SettingsController() {
    _classCallCheck(this, SettingsController);
  }

  _createClass(SettingsController, [{
    key: 'updateUserSettings',

    /**
     * Update settings for a user
     * @param {object} req the express request object
     * @param {object} res the express response object
     *
     * @returns {object} json response to user with new settings
     */
    value: async function updateUserSettings(req, res) {
      var newSettings = await (0, _helpers.updateUserSettings)(req.authUserObj, req.body);
      return res.sendSuccessResponse({ settings: newSettings });
    }
  }]);

  return SettingsController;
}();

exports.default = SettingsController;