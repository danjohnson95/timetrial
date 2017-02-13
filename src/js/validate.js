var obj = {

	/**
	 * Ensures data meets requirements for trials
	 * @param obj Data about to be put in storage
	 * @param callback
	 */
	trial: function(data, callback){
		var errors = [];
		if(!("name" in data) || data.name == "")
			errors.push({field: "name", msg: "Name cannot be empty"});
		if(!("code_1" in data) || data.code_1 == "")
			errors.push({"field": "code_1", "msg": "First trial cannot be empty"});
		if(!("code_2" in data) || data.code_2 == "")
			errors.push({"field": "code_2", "msg": "Second trial cannot be empty"});

		if(errors.length) return callback(false, errors);
		return callback(true, null);
	}

};

module.exports = obj;
