/**
 * @author sarkiroka
 */
module.exports = function (descriptor, callback) {
	if (typeof descriptor._simpleStateHolderPath != 'string') {
		return callback('onparse is not supported yet');
	}
	var retValue = {
		_descriptor: descriptor,
		_object: null,
		getState: getState,
		setState: setState,
		setObject: setObject
	};

	function setObject(object) {
		retValue._object = object
	}

	function getState() {
		return retValue._object[descriptor._simpleStateHolderPath]
	}

	function setState(newState) {
		var currentState = getState();
		var possibleStates = descriptor[currentState];
		var availableStates = [];
		for (var i = 0; i < possibleStates.length; i++) {
			var possibleState = possibleStates[i];
			if (typeof possibleState == 'undefined') {
				//nothing to do
			} else if (typeof possibleState == 'string') {
				availableStates.push(possibleState);
			} else {
				if (typeof possibleState.condition == 'function' && typeof possibleState.to == 'string') {
					var possible = possibleState.condition(retValue._object);
					if (possible) {
						availableStates.push(possibleState.to);
					}
				}
			}
		}
		var itIsPossible = availableStates.indexOf(newState) > -1;
		if (itIsPossible) {
			retValue._object[descriptor._simpleStateHolderPath] = newState;
		}
		return itIsPossible;
	}

	return retValue;
};
