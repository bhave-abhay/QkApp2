function QkStorage (sPrefix, storageRef) {

	const storage = (storageRef === undefined) ? window.sessionStorage : storageRef;

	this.getItem = function (sName) {
		return storage.getItem(sPrefix + sName);
	};

	this.setItem = function (sName, sValue) {
		storage.setItem(sPrefix + sName, sValue);
	};

	this.removeItem = function (sName) {
		storage.removeItem(sPrefix + sName);
	};
};

module.exports = QkStorage;
