function QkStorage (sPrefix, storageRef) {

	var getPersistantStorage = () => window.localStorage;
	var getVolatileStorage = () => window.sessionStorage;

	this.getItem = function (sName) {
		return getVolatileStorage().getItem(sPrefix + sName);
	};

	this.setItem = function (sName, sValue) {
		getVolatileStorage().setItem(sPrefix + sName, sValue);
	};

	this.removeItem = function (sName) {
		getVolatileStorage().removeItem(sPrefix + sName);
	};

	this.getPersistantItem = function (sName) {
		return getPersistantStorage().getItem(sPrefix + sName);
	};

	this.setPersistantItem = function (sName, sValue) {
		getPersistantStorage().setItem(sPrefix + sName, sValue);
	};

	this.removePersistantItem = function (sName) {
		getPersistantStorage().removeItem(sPrefix + sName);
	};
};

module.exports = QkStorage;
