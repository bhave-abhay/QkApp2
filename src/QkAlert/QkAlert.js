function QkAlert (objConfig) {
	function CreateAlertElt(msg, cssClass) {
		var elt = $('<div></div>')
					.addClass(['qkalert', 'alert', 'alert-dismissable', cssClass])
					.append(msg)
					.append('<span class="close" data-dismiss="alert" aria-label="close">X</span>');
		return elt;

	}

	var this_ = this;
	this_.show_alert = function (msg, cssClass, nTimeoutSec) {
		if(objConfig.singularAlert){
			var oldAlertElt = $('.qkalert', this_);
			if(oldAlertElt != null){
				var timerID = oldAlertElt.attr('data-timer-id');
				clearTimeout(timerID);
				oldAlertElt.toggle("fold", function () {
					oldAlertElt.detach();
				});
			}
		}
		if (cssClass === undefined) {
			cssClass = 'alert-warning';
		}
		if (nTimeoutSec === undefined) {
			nTimeoutSec = 10;
		}
		var alertElt = CreateAlertElt(msg, cssClass);
		alertElt.hide();
		if (nTimeoutSec !== 0) {
			var timerID = setTimeout(function () {
				alertElt.toggle("fold", function () {
					alertElt.detach();
				});
			}, nTimeoutSec * 1000 /* ms */);
			alertElt.attr('data-timer-id', timerID);
		}
		$(this_).prepend(alertElt);
		alertElt.toggle("fold");
	};
	return this_;
};

module.exports = QkAlert;
