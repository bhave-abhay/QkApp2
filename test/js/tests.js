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

function test_alert(sAlertContainerElementSelector, sAlertTriggerElementSelector, fSingularAlert) {
	var alertContainer = $(sAlertContainerElementSelector).QkAlert({
		singularAlert: (fSingularAlert == true)
	});
	$(sAlertTriggerElementSelector).on('click', function (e) {
		var sMessage = randomMessage();
		var sCssClass = randomCssClass();
		alertContainer.show_alert(sMessage + ' (' + sCssClass + ')', sCssClass);
	})
}

function test_dialog(dialog, sDialogTriggerElementSelector) {
	$(sDialogTriggerElementSelector).on('click', function (e) {
		var sCssClass = randomCssClass();
		dialog.
			show_dialog(randomMessage(), randomMessage(), {})
			.buttons([{
				sText: 'Ok ' + sCssClass,
				cssClasses: sCssClass,
				onClick: ()=>{
					dialog.hide_dialog();
				}
			}]);
	})
}
