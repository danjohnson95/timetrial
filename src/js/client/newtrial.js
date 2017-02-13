const validate = require('./src/js/validate.js');

const obj = {

	elements: {},

	init: function(){
		this.getElements();
		this.registerEventListeners();
	},

	getElements: function(){
		this.elements.addbtn = document.getElementById('new-trial');
		this.elements.newform = document.getElementById('new-form');
		this.elements.saverun = document.getElementById('save-and-run');
	},

	registerEventListeners: function(){
		this.elements.addbtn.addEventListener('click', obj.shownewform);
		this.elements.saverun.addEventListener('click', obj.saverun);
	},

	shownewform: function(){
		if(this.classList.contains('active')) return;
		this.classList.add('active');
		obj.elements.newform.classList.remove('hide');
		obj.elements.saverun.classList.remove('hide');
	},

	getValues: function(){
		return {};
	},

	saverun: function(){
		// TODO: Client side checks here.
		var values = obj.getValues();
		validate.trial(values, function(passed, obj){
			console.log(passed);
			if(!passed) return obj.handleErrors(obj);
		});
	}

};

obj.init();
