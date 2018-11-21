var QkOverlay = require('./QkOverlay');
var QkAlert = require('./QkAlert');

/**
 * See (http://jquery.com/).
 * @name $
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (http://jquery.com/)
 * @name fn
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */

function register($) {
	$.fn.QkOverlay = QkOverlay;
	$.fn.QkAlert = QkAlert;
}

module.exports = {
	register,
	version: '1.1.0'
};
