const store = require('./store.js');

var obj = {

	/**
	 * Gets all the trials created by the user
	 * @param callback
	 */
	getMyTrials: function(callback){
		store.trials.find({}, function(err, trials){
			callback(trials);
		});
	},

	/**
	 * Returns API errors back to the user
	 * @param obj The reason why the API call failed
	 * @param callback
	 */
	error: function(obj, callback){
		return callback(obj, null);
	},

	/**
	 * Ensures data meets requirements
	 * @param obj Data about to be put in storage
	 * @param callback
	 */
	validate: function(data, callback){
		var errors = [];
		if(!"name" in data || data.name == "")
			errors.push({"field": "name", "msg": "Name cannot be empty"});
		if(!"code_1" in data || data.code_1 == "")
			errors.push({"field": "code_1", "msg": "First trial cannot be empty"});
		if(!"code_2" in data || data.code_2 == "")
			errors.push({"field": "code_2", "msg": "Second trial cannot be empty"});

		if(errors.length) return callback(false, errors);
		return callback(true, null);
	},

	/**
	 * Creates a new resource in storage
	 * @param obj Data to be stored
	 * @param callback
	 */
	new: function(data, callback){
		this.validate(data, function(passed, obj){
			if(!passed) this.error(obj, callback);
		});
	},

	/**
	 * Updates an existing resource in storage
	 * @param obj Resource to be updated, with the new data
	 * @param callback
	 */
	update: function(data, callback){
		this.validate(data, function(passed, obj){
			if(!passed) this.error(obj, callback);
		});
	},

	/**
	 * Deletes an existing resource in storage
	 * @param obj Resource to be deleted
	 * @param callback
	 */
	delete: function(data, callback){

	}

};

module.exports = obj;
