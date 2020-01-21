function test_overlay(app, sOverlaidElementSelector, sTogglerElementSelector) {
	var overlay = $(sOverlaidElementSelector).QkOverlay();
	$(sTogglerElementSelector).on('click', function (e) {
		if(overlay.is_shown()) {
			overlay.hide_overlay();
		}
		else {
			overlay.show_overlay();
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

function test_alert(app, sAlertContainerElementSelector, sAlertTriggerElementSelector, fSingularAlert) {
	var alertContainer = $(sAlertContainerElementSelector).QkAlert({
		singularAlert: (fSingularAlert == true)
	});
	$(sAlertTriggerElementSelector).on('click', function (e) {
		var sMessage = randomMessage();
		var sCssClass = randomCssClass();
		alertContainer.show_alert(sMessage + ' (' + sCssClass + ')', sCssClass);
	})
}

function test_dialog(app, sDialogTriggerElementSelector, fnGetTitle, fnGetMessage, fnGetSize) {
	$(sDialogTriggerElementSelector).on('click', function (e) {
		var sCssClass = randomCssClass();
		app.
			show_dialog(fnGetTitle(), fnGetMessage(), {}, {'size': fnGetSize()})
			.buttons([{
				sText: 'Ok ' + sCssClass,
				cssClasses: sCssClass,
				onClick: ()=>{
					app.hide_dialog();
				}
			}]);
	})
}
