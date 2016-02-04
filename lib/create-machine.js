/**
 * @author sarkiroka
 */
module.exports = function (descriptor, callback) {
	if (typeof descriptor._simpleStateHolderPath != 'string') {
		return callback('onparse is not supported yet');
	}
	var retValue = {
		_object: null,
		getState: getState,
		setState: setState,
		setObject: setObject,
		getPossibilities: getPossibilities,
		isValid: isValid
	};

	function setObject(object) {
		retValue._object = object
	}

	function getState() {
		return retValue._object[descriptor._simpleStateHolderPath]
	}

	function setState(newState) {
		var availableStates = getPossibilities();
		var itIsPossible = availableStates.indexOf(newState) > -1;
		if (itIsPossible) {
			retValue._object[descriptor._simpleStateHolderPath] = newState;
		}
		return itIsPossible;
	}

	function getPossibilities() {
		var currentState = getState();
		var possibleStates = descriptor[currentState];
		var availableStates = [];
		if (typeof possibleStates != 'undefined') {
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
		} else {//if no current state then everthing is possible
			var keys = Object.keys(descriptor);
			for (var i = 0; i < keys.length; i++) {
				var state = keys[i];
				if (state.indexOf('_') != 0) {
					availableStates.push(state);
				}
			}
		}
		return availableStates;
	}

	function isValid() {
		var currentState = getState();
		var states = Object.keys(descriptor);
		var retValue = states.indexOf(currentState) > -1;
		return retValue;
	}

	callback(null, retValue);
};
