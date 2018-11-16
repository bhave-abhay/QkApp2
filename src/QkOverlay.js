var styles = require('./QkOverlayStyles');

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

var QkOverlay = function () {
	var eltOverlay = null;
	this.css('position', 'relative');

	this.show_overlay = function (sMsgHtml, sImgHtml) {
		if (eltOverlay !== null) {
			eltOverlay.detach();
			eltOverlay = null;
		}
		console.log('Showing overlay');
		eltOverlay = CreateOverlayElt(sMsgHtml, sImgHtml);
		this.append(eltOverlay);
	};

	this.hide_overlay = function () {
		console.log('Hiding overlay');
		if (eltOverlay !== null) {
			eltOverlay.detach();
			eltOverlay = null;
		}
	};

	this.is_shown = function () {
		return (eltOverlay !== null);
	}

	return this;
};

module.exports = QkOverlay;
