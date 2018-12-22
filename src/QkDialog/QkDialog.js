var QkForm = require('../QkForm');

function QkDialog (objOptions) {

		var timerID = null;
		var cbOnTimeout = null;
		var cbOnClose = null;
		var fShown = false;
		var jqElts = {
			dialog_title: $(this.find('.modal-title')[0]),
			dialog_close: $(this.find('.close')[0]),
			dialog_message: $(this.find('.modal-body')[0]),
			dialog_footer: $(this.find('.modal-footer')[0]),
			dialog_dialogForm: null
		};
		//evet handlers
		{
			var this_dialog = this;
			jqElts.dialog_close.on('click', function (e) {
				this_dialog.hide_dialog();
				e.preventDefault();
			});
			this_dialog.on('hidden.bs.modal', function () {
				jqElts.dialog_footer.empty();
				this_dialog.off('shown.bs.modal');
				$(document, jqElts.dialog).off('keyup');
				if (timerID !== null) {
					clearTimeout(timerID);
					timerID = null;
				}
				if (typeof cbOnClose === 'function') {
					cbOnClose();
					cbOnClose = null;
				}
			});
		}

		//members
		this.hide_dialog = function () {
			jqElts.dialog_footer.empty();
			if (jqElts.dialog_dialogForm instanceof $) {
				jqElts.dialog_dialogForm.hide().detach();
			}
			this_dialog.modal('hide');
		};
		this.show_dialog = function (sTitle, objMessage, objFormData, nTimeoutSec) {
			if (fShown) {
				this.hide_dialog();
			}
			jqElts.dialog_title.html(sTitle);
			if (jqElts.dialog_dialogForm instanceof $) {
				jqElts.dialog_dialogForm.hide().detach();
			}
			jqElts.dialog_dialogForm = null;
			if (typeof objMessage === 'string') {
				jqElts.dialog_dialogForm = $('<div></div>').append(objMessage).QkForm();
			} else if (objMessage instanceof $) {
				jqElts.dialog_dialogForm = objMessage.show();
			}
			jqElts.dialog_dialogForm.on('qkform:key_enter', function () {
				// $($('.[data-btn-default="true"]', jqElts.dialog_footer)[0]).click();
				$('button[data-defaultbutton]:first', jqElts.dialog_footer).trigger('click');
			});
			$('*[data-qkform-causesvalidation="true"]', jqElts.dialog_dialogForm).removeClass(objOptions.sInvalidInputClass);
			jqElts.dialog_message.html(jqElts.dialog_dialogForm);
			this_dialog.on('shown.bs.modal', function () {
				if (nTimeoutSec !== undefined) {
					if (timerID !== null) {
						clearTimeout(timerID);
						timerID = null;
					}
					timerID = setTimeout(this_dialog.hide_dialog, nTimeoutSec * 1000 /*milliseconds*/);
				}
				if (objFormData === undefined) {
					jqElts.dialog_dialogForm.clearForm();
				} else {
					jqElts.dialog_dialogForm.qkval(objFormData);
				}
				$(document, jqElts.dialog).keyup(function (e) {
					if (e.keyCode === 27) { // escape key
						this_dialog.hide_dialog();
						e.preventDefault();
					}
				});
				fShown = true;
			}).on('hidden.bs.modal', function () {
				if (timerID !== null) {
					clearTimeout(timerID);
					timerID = null;
				}
				$(document, jqElts.dialog).off('keyup');
				fShown = false;
			});

			this_dialog.modal({
				'backdrop': false,
				'keyboard': false,
				'show': true
			});
			return this;
		};
		this.buttons = function (arrButtons) {
			jqElts.dialog_footer.empty();
			jqElts.arrButtons = [];
			for (var i = 0; i < arrButtons.length; i++) {
				let btnRef = $('<button></button>')
					.addClass('btn')
					.addClass(arrButtons[i].cssClasses)
					.html(arrButtons[i].sText)
					.data('btn-key', (arrButtons[i].sKey === undefined) ? arrButtons[i].sText : arrButtons[i].sKey)
					.attr('tabindex', 0)
					.attr('data-btnindex', i);

				if(arrButtons[i].fIsDefault){
					btnRef.attr('data-defaultbutton', true);
				}

				btnRef.click(function (evt) {
					var dialogState = {
						fValid: jqElts.dialog_dialogForm.validate()
					};
					if (dialogState.fValid) {
						dialogState.formData = jqElts.dialog_dialogForm.qkval();
					}
					arrButtons[btnRef.attr('data-btnindex')].onClick(dialogState);
				})
				.keypress(function (e) {
					if (e.key === "Enter" || e.char === "\n") { //Enter
						$(e.target).click();
					}
				})
				.appendTo(jqElts.dialog_footer);
				jqElts.arrButtons.push(btnRef);
			}
			return this;
		};

		this.disable_dialog_button = function (sKey) {
			for (var i = 0; i < jqElts.arrButtons.length; i++) {
				if (jqElts.arrButtons[i].data('btn-key') === sKey) {
					jqElts.arrButtons[i].attr('disabled', true);
					break;
				}
			}
		}

		this.enable_dialog_button = function (sKey) {
			for (var i = 0; i < jqElts.arrButtons.length; i++) {
				if (jqElts.arrButtons[i].data('btn-key') === sKey) {
					jqElts.arrButtons[i].attr('disabled', false);
					break;
				}
			}
		}
		this.detach();
		return this;
	};

	module.exports = QkDialog;
