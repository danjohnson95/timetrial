const store = require('./store.js');

var obj = {

	getMyTrials: function(callback){
		store.trials.find({}, function(err, trials){
			callback(trials);
		});
	}

};

module.exports = obj;
