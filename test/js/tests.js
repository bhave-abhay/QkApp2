function test_overlay(sOverlaidElementSelector, sTogglerElementSelector) {
	var overlay = $(sOverlaidElementSelector).QkOverlay();
	$(sTogglerElementSelector).on('click', function (e) {
		if(overlay.is_shown()) {
			overlay.hide_overlay();
		}
		else {
			overlay.show_overlay('Please wait while background task finishes');
		}
	})
}

var messageList = [
	'Hello',
	'Hi',
	'Heyy',
	'Aey'
]
var randomMessage =()=> messageList[Math.floor(Math.random() * messageList.length)];


var cssClassList = [
	'alert-danger',
	'alert-default',
	'alert-info',
	'alert-success',
	'alert-warning',
]
var randomCssClass =()=> cssClassList[Math.floor(Math.random() * cssClassList.length)];

function test_alert(sAlertContainerElementSelector, sAlertTriggerElementSelector) {
	var alertContainer = $(sAlertContainerElementSelector).QkAlert({
		singularAlert: false
	});
	$(sAlertTriggerElementSelector).on('click', function (e) {
		var sMessage = randomMessage();
		var sCssClass = randomCssClass();
		alertContainer.show_alert(sMessage + ' (' + sCssClass + ')', sCssClass);
	})
}
