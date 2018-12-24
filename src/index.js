var QkOverlay = require('./QkOverlay');
var QkAlert = require('./QkAlert');
var QkForm = require('./QkForm');
var QkDialog = require('./QkDialog');

var QkStorage = require('./QkStorage');

function QkApp($, options) {
	//Add functions to JQuery namespace
	$.fn.QkForm = QkForm;
	// $.fn.QkWizard = QkWizard;
	$.fn.QkDialog = QkDialog;
	$.fn.QkOverlay = QkOverlay;
	$.fn.QkAlert = QkAlert;

	var objOptionsDefault = {
		'eltDialog': $(document).find('*[data-qkapp-role="dialog"]')[0],
		'eltOverlayContainer': $(document).find('*[data-qkapp-role="overlay-container"]')[0],
		'eltAlertContainer': $(document).find('*[data-qkapp-role="alert-container"]')[0]
	};
	var objOptions = {
		...options,
		...objOptionsDefault,
	};

	var _qk_alert = $(objOptions.eltAlertContainer).QkAlert();
	this.alert = _qk_alert.show_alert.bind(_qk_alert);

	var _qk_dialog = $(objOptions.eltDialog).QkDialog({});
	this.show_dialog = _qk_dialog.show_dialog.bind(_qk_dialog);
	this.hide_dialog = _qk_dialog.hide_dialog.bind(_qk_dialog);
	this.enable_dialog_button = _qk_dialog.enable_dialog_button.bind(_qk_dialog);
	this.disable_dialog_button = _qk_dialog.disable_dialog_button.bind(_qk_dialog);

	var _qk_overlay = $(objOptions.eltOverlayContainer).QkOverlay();
	this.show_overlay = _qk_overlay.show_overlay.bind(_qk_overlay);
	this.hide_overlay = _qk_overlay.hide_overlay.bind(_qk_overlay);

	this.qkStorage = new QkStorage('app_');

	this.redirectTo = function (sUrl, message){
		var objMessage = {
			'sMessage': '',
			'sCssClasses': 'alert-success'
		};
		if(message !== undefined){
			if(typeof(message) === 'string'){
				objMessage.sMessage = message;
			}
			if (typeof(message) === 'object') {
				objMessage = message;
			} else {
				//Unknown param
			}
			this.qkStorage.setItem('objPageLoadMessage', JSON.stringify(message));
		}
		window.location.replace(sUrl);
	}

	var sObjPageLoadMessageJsonString = this.qkStorage.getItem('objPageLoadMessage');
	if(sObjPageLoadMessageJsonString !== null){
		var objPageLoadMessage = JSON.parse(sObjPageLoadMessageJsonString);
		this.qkStorage.removeItem('objPageLoadMessage');
		this.alert(objPageLoadMessage.sMessage, objPageLoadMessage.sCssClasses);
	}

}

module.exports = {
	QkApp: QkApp,
	version: '1.1.0'
};
