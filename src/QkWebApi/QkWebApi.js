/**
* @desc QkWebApi. An overlay plugin
 * @class QkWebApi
 * @memberOf $.fn
 * @hideconstructor
 */
function QkWebApi (options) {

	var objOptions = {};

	if(options.fIsSuccess === undefined) {
		objOptions.fIsSuccess = rsp => true;
	}
	else {
		objOptions.fIsSuccess = options.fIsSuccess
	}

	if(options.getErrorObject === undefined) {
		objOptions.getErrorObject = rsp => null;
	}
	else {
		objOptions.getErrorObject = options.getErrorObject;
	}

	if(options.decorateRequest === undefined) {
		objOptions.decorateRequest = req => req;
	}
	else {
		objOptions.decorateRequest = options.decorateRequest;
	}

	objOptions.sApiUrlBase = options.sApiUrlBase;

	function onAjaxSuccess(rsp, dfd){
		if(objOptions.fIsSuccess(rsp)){
			dfd.resolve(rsp);
		}
		else {
			dfd.reject(objOptions.getErrorObject(rsp));
		}
	}

	 /**
	 * @desc HTTP Get
	 * @function get
	 * @param sUrl {string} url to be requested
	 * @param oParams {object} ParamsObject params to be sent
	 * @memberOf QkWebApi
	 * $@instance
	 */
	this.get = function (sUrl, oParams) {
		var objRequestParams = objOptions.decorateRequest(oParams);
		var sUrlCall = objOptions.sApiUrlBase + sUrl + "/?" + $.param(objRequestParams);
	    var dfd = $.Deferred();
	    $.getJSON(sUrlCall)
	        .done(function (rsp) {
	            onAjaxSuccess(rsp, dfd);
	        })
	        .fail(function (error) {
	            dfd.reject(error.status + " - " + error.statusText);
	        });
	    return dfd.promise();
	};

	 /**
	 * @desc HTTP Post
	 * @function post
	 * @param sUrl {string} url to be requested
	 * @param oParams {object} ParamsObject params to be sent
	 * @memberOf QkWebApi
	 * $@instance
	 */
	this.post = function (sUrl, oParams) {
		var objRequestParams = objOptions.decorateRequest(oParams);
	    var dfd = $.Deferred();
		var sUrlCall = objOptions.sApiUrlBase + sUrl;
	    $.ajax({
	        type: "POST",
	        dataType: "json",
	        url: sUrlCall,
	        data: objRequestParams,
	        success: function (rsp) {
	            onAjaxSuccess(rsp, dfd);
	        },
	        error: function (error) {
	            dfd.reject(error.status + " - " + error.statusText);
	        }
	    });
	    return dfd.promise();
	};

	return this;
};

module.exports = QkWebApi;
