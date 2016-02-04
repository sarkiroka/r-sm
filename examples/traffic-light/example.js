/**
 * @author sarkiroka
 */
var rSm = require('../..');
var myObject = {
	serialNumber: '2afa686e-0c48-42b3-b4b4-57c71e6c9141',
	name: 'traffic light',
	light: null//the stateholder property
};
var stateMachineDescriptor = require('./state-machine.json');
rSm(stateMachineDescriptor, function (err, machine) {
	if (err) {
		console.error(err);
	} else {
		machine.setObject(myObject);

		machine.setState('red');//undefined->red, ok return true
		machine.setState('green');//not possible, return false
		machine.setState('yellow');//red->yellow, ok return true
		machine.getPossibilities();//returns ['green'] because the red "on" condition returns false
	}
});
