function QkStorage (storageOptions) {

	var getPersistantStorage = () => window.localStorage;
	var getVolatileStorage = () => window.sessionStorage;
	
	this.getKeyName = (s) => (storageOptions.sPrefix + s);
	if(typeof(storageOptions.fnKeyNameTransform) == 'function') {
		this.getKeyName = function(s){
			return storageOptions.fnKeyNameTransform(storageOptions.sPrefix + s);
		};
	}

	this.getItem = function (sName) {
		return getVolatileStorage().getItem(this.getKeyName(sName));
	};

	this.setItem = function (sName, sValue) {
		getVolatileStorage().setItem(this.getKeyName(sName), sValue);
	};

	this.removeItem = function (sName) {
		getVolatileStorage().removeItem(this.getKeyName(sName));
	};

	this.getPersistantItem = function (sName) {
		return getPersistantStorage().getItem(this.getKeyName(sName));
	};

	this.setPersistantItem = function (sName, sValue) {
		getPersistantStorage().setItem(this.getKeyName(sName), sValue);
	};

	this.removePersistantItem = function (sName) {
		getPersistantStorage().removeItem(this.getKeyName(sName));
	};
};

module.exports = QkStorage;
