var Vetoable = require('./Vetoable');

function QkForm (objOptions) {
	//Defaults
	var _handlers = {
		cbInitForm: function () {
			return {};
		},
		cbGetData: function () {
			return {};
		},
		cbShowData: function (objData) { },
		cbOnDirty: function () { },
		cbClearForm: function () { }
	};
	var jqElts = {
		validationSummary: $(this.find('*[data-qkform-role="validation-summary"]')[0])
	};

	//init
	jqElts.validationSummary.empty().hide();

	if (objOptions === undefined) {
		objOptions = {};
	}
	if (objOptions.sInvalidInputClass === undefined) {
		objOptions.sInvalidInputClass = '';
	}
	if (typeof objOptions.cbInitForm === 'function') {
		_handlers.cbInitForm = objOptions.cbInitForm;
	}
	if (typeof objOptions.cbGetData === 'function') {
		_handlers.cbGetData = objOptions.cbGetData;
	}
	if (typeof objOptions.cbShowData === 'function') {
		_handlers.cbShowData = objOptions.cbShowData;
	}
	if (typeof objOptions.cbClearForm === 'function') {
		_handlers.cbClearForm = objOptions.cbClearForm;
	}

	_handlers.cbInitForm();
	//event handlers
	{
		let this_form = this;
		this_form.on('keyup change', '*[data-qkform-causesvalidation="true"]', function (e) {
			this_form.validate();
			if(e.keyCode===13){
				this_form.trigger('qkform:key_enter');
			}
		});
	}

	//members
	this.validate = function () {
		var evt = new $.Event("qkform:validate");
		var vetoPoll = new Vetoable();
		$('*[data-qkform-causesvalidation="true"]', this)
				.removeClass(objOptions.sInvalidInputClass);
		jqElts.validationSummary.empty().hide();
		this.trigger(evt, vetoPoll);
		if (vetoPoll.isVetoed()) {
			var arrReasons = vetoPoll.getVetoReasons();
			let ul = $('<ul></ul>');
			for (var i = 0; i < arrReasons.length; i++) {
				if (arrReasons[i].sTarget !== undefined) {
					$('#' + arrReasons[i].sTarget)
							.addClass(objOptions.sInvalidInputClass);
				}
				if (arrReasons[i].sReason !== undefined) {
					ul.append(
							$('<li class="text-red"></li>').html(arrReasons[i].sReason)
							);
				}
			}
			jqElts.validationSummary.html(ul).show();
			return false;
		}
		return true;
	};

	this.qkval = function (newVal) {
		if (newVal === undefined) { //Get
			if (this.validate()) {
				return _handlers.cbGetData();
			}
			return undefined;
		} else { //Set
			_handlers.cbShowData(newVal);
			$('*[data-qkform-causesvalidation="true"]', this).removeClass(objOptions.sInvalidInputClass);
			jqElts.validationSummary.empty().hide();
		}
	};

	this.clearForm = function () {
		_handlers.cbClearForm();
	}

	return this;
};

module.exports = QkForm;
