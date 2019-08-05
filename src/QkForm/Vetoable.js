function Vetoable () {
	var fVetoed = false;
	var arrVetoReason = [];
	this.veto = function (sVetoReason, sTarget) {
		fVetoed = true;
		if (sVetoReason !== undefined || sTarget !== undefined) {
			arrVetoReason.push({
				sReason: sVetoReason,
				sTarget: sTarget
			});
		}
	};
	this.isVetoed = function () {
		return !!fVetoed;
	};
	this.getVetoReasons = function () {
		if (fVetoed) {
			return arrVetoReason.slice();
		}
		return null;
	};
};

module.exports = Vetoable;
