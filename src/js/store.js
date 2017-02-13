const db = require('nedb'),
	  path = require('path'),
	  app = require('electron').app,
	  
	  trials = new db({ filename: path.join(app.getPath('userData'), 'trials.db'), autoload: true });

module.exports = {
	trials: trials
};
