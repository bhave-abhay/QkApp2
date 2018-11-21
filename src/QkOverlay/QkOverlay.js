var styles = require('./QkOverlayStyles');

/**
 * QkOverlay. An overlay plugin
 * @function QkOverlay
 * @memberOf $.fn
 * @return {QkOverlayPlugin}
 */

function QkOverlay () {

	function CreateOverlayElt(sMsgHtml, sImgHtml) {
		if (sMsgHtml === undefined) {
			sMsgHtml = '<h1>Loading... please wait!</h1>';
		}
		if (sImgHtml === undefined) {
			sImgHtml = 'Loader Image';
		}
		var eltOverlay = $('<div></div>');
		var eltWrapper = $('<div class="spinDiv"></div>');
		var eltImage = $('<div></div>').html(sImgHtml);
		var eltText = $('<strong></strong>').html(sMsgHtml);
		eltWrapper.css('margin', '0 auto').append(eltImage).append(eltText);
		eltOverlay.append(eltWrapper);
		eltOverlay.css(styles.overlay);
		return eltOverlay;
	}

	var eltOverlay = null;

	this.css('position', 'relative');

	 /**
	 * Shows the overlay
	 * @param sMsgHtml {string} message html to be shown on overlay
	 * @param sImgHtml {string} loader image html to be shown on overlay
	 * @function show_overlay
	 * @memberOf QkOverlayPlugin
	 * @instance
	 */
	this.show_overlay = function (sMsgHtml, sImgHtml) {
		if (eltOverlay !== null) {
			eltOverlay.detach();
			eltOverlay = null;
		}
		console.log('Showing overlay');
		eltOverlay = CreateOverlayElt(sMsgHtml, sImgHtml);
		this.append(eltOverlay);
	};

	 /**
	 * Hides the overlay
	 * @function hide_overlay
	 * @memberOf QkOverlayPlugin
	 * @instance
	 */
	this.hide_overlay = function () {
		console.log('Hiding overlay');
		if (eltOverlay !== null) {
			eltOverlay.detach();
			eltOverlay = null;
		}
	};

	/**
	* Returns whether this overlay is currently shown
	* @function is_shown
	* @memberOf QkOverlayPlugin
	* @instance
	*/
	this.is_shown = function () {
		return (eltOverlay !== null);
	}

	return this;
};

module.exports = QkOverlay;
