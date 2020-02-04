function QkStorage (storageOptions) {

	var getPersistantStorage = () => window.localStorage;
	var getVolatileStorage = () => window.sessionStorage;
	var getKeyName = (s) => (storageOptions.sPrefix + s);
	
	if(typeof(storageOptions.fnKeyNameTransform) == 'function') {
		getKeyName = (s) => storageOptions.fnKeyNameTransform(storageOptions.sPrefix + s);
	}

	this.getItem = function (sName) {
		return getVolatileStorage().getItem(getKeyName(sName));
	};

	this.setItem = function (sName, sValue) {
		getVolatileStorage().setItem(getKeyName(sName), sValue);
	};

	this.removeItem = function (sName) {
		getVolatileStorage().removeItem(getKeyName(sName));
	};

	this.getPersistantItem = function (sName) {
		return getPersistantStorage().getItem(getKeyName(sName));
	};

	this.setPersistantItem = function (sName, sValue) {
		getPersistantStorage().setItem(getKeyName(sName), sValue);
	};

	this.removePersistantItem = function (sName) {
		getPersistantStorage().removeItem(getKeyName(sName));
	};
};

module.exports = QkStorage;
