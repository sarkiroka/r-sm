/**
 * @author sarkiroka
 */
var createMachine = require('./lib/create-machine');
var parseDescriptor = require('./lib/parse-descriptor');
module.exports = function (machineDescriptor, callback) {
	parseDescriptor(machineDescriptor, function (err, descriptor) {
		if (err) {
			callback(err);
		} else {
			createMachine(descriptor, callback);
		}
	});
};
