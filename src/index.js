var QkOverlay = require('./QkOverlay');

function register($) {
	$.fn.QkOverlay = QkOverlay;
}

module.exports = {
	register,
	version: '1.1.0'
};
