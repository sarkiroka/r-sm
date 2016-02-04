/**
 * @author sarkiroka
 */
var fs = require('fs');
module.exports = function (path, callback) {
	if (typeof path == 'object') {
		callback(null, path);
	} else if (typeof path == 'string') {
		fs.readFile(path, function (err, data) {
			if (err) {
				return callback(err);
			}
			try {
				var parsed = JSON.parse(data);
			} catch (e) {
				return callback(e);
			}
			var preprocessed = replaceFunctions(parsed);
			callback(err, preprocessed);
		});
	} else {
		callback('invalid descriptor');
	}
};
