var styles = require('./QkOverlayStyles');

/**
* @desc QkOverlay. An overlay plugin
 * @class QkOverlay
 * @memberOf $.fn
 * @hideconstructor
 */
function QkOverlay (objOptions) {

	if(objOptions===undefined) {
		objOptions = {};
	}

	var objDefaults = {
		'sMsgHtml': (objOptions.sMsgHtmlDefault == undefined
						?
						'Please wait...'
						:
						objOptions.sMsgHtmlDefault),
		'sImgHtml': (objOptions.sImgHtmlDefault == undefined
						?
						'<div class="spinner-border text-primary" role="status"></div>'
						:
						objOptions.sImgHtmlDefault),
	}
	function CreateOverlayElt(sMsgHtml, sImgHtml) {
		if (sMsgHtml === undefined) {
			sMsgHtml = objDefaults.sMsgHtml;
		}
		if (sImgHtml === undefined) {
			sImgHtml = objDefaults.sImgHtml;
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

	 /**
	 * @desc Shows the overlay
	 * @function show_overlay
	 * @param sMsgHtml {string} message html to be shown on overlay
	 * @param sImgHtml {string} loader image html to be shown on overlay
	 * @memberOf QkOverlay
	 * $@instance
	 */
	this.show_overlay = function (sMsgHtml, sImgHtml) {
		if (eltOverlay !== null) {
			eltOverlay.detach();
			eltOverlay = null;
		}
		eltOverlay = CreateOverlayElt(sMsgHtml, sImgHtml);
		this.append(eltOverlay);
	};

	 /**
	 * @desc Hides the overlay
	 * @function hide_overlay
	 * @memberOf QkOverlay
	 * $@instance
	 */
	this.hide_overlay = function () {
		if (eltOverlay !== null) {
			eltOverlay.detach();
			eltOverlay = null;
		}
	};

	/**
	* @desc Returns whether this overlay is currently shown
	* @function is_shown
	* @memberOf QkOverlay
	* $@instance
	*/
	this.is_shown = function () {
		return (eltOverlay !== null);
	}

	return this;
};

module.exports = QkOverlay;
