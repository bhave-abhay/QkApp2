var QkOverlay = require('./QkOverlay');
var QkAlert = require('./QkAlert');
var QkForm = require('./QkForm');
var QkDialog = require('./QkDialog');
/**
 * @fileOverview QkApp plugins library
 *               <p>License MIT
 *               <br />Copyright 2018 Abhay Bhave, GIPL
 * @version 1.00
 * @author Abhay Bhave
 * @requires jquery
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>.
 * @name $
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>
 * @name fn
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */



function register($) {
	$.fn.QkOverlay = QkOverlay;
	$.fn.QkAlert = QkAlert;
	$.fn.QkForm = QkForm;
	$.fn.QkDialog = QkDialog;
}

module.exports = {
	register: register,
	version: '1.1.0'
};
