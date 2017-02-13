const validate = require('./src/js/validate.js');
const {ipcRenderer} = require('electron');
const trialer = require('./src/js/trialer.js');

const obj = {

	elements: {
		form: {}
	},

	init: function(){
		this.getElements();
		this.registerEventListeners();
	},

	getElements: function(){
		this.elements.addbtn = document.getElementById('new-trial');
		this.elements.newform = document.getElementById('new-form');
		this.elements.saverun = document.getElementById('save-and-run');
		this.elements.mainstatus = this.elements.newform.querySelector('.main-status');

		this.elements.form.name = this.elements.newform.querySelector('input[name=name]');
		this.elements.form.description = this.elements.newform.querySelector('textarea[name=description]');
		this.elements.form.html = this.elements.newform.querySelector('textarea[name=html]');
		this.elements.form.code_1 = this.elements.newform.querySelector('textarea[name=code_1]');
		this.elements.form.code_2 = this.elements.newform.querySelector('textarea[name=code_2]');

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
		return {
			name: obj.elements.form.name.value,
			description: obj.elements.form.description.value,
			html: obj.elements.form.html.value,
			code_1: obj.elements.form.code_1.value,
			code_2: obj.elements.form.code_2.value
		};
	},

	handleErrors: function(errors){
		errors.forEach(function(e){
			obj.elements.form[e.field].classList.add('error');
			// TODO: Also output errors as text
		});
	},

	resetErrors: function(){
		var elm;
		Object.keys(obj.elements.form).forEach(function(name){
			elm = obj.elements.form[name];
			if(elm.classList.contains('error')) elm.classList.remove('error');
		});
	},

	saverun: function(){
		obj.resetErrors();
		var values = obj.getValues();
		validate.trial(values, function(passed, errors){
			if(!passed) return obj.handleErrors(errors);
			var newexisting = "new";
			ipcRenderer.send('saveandrun', {status: newexisting, values: values});
			ipcRenderer.send('start', {code_1: values.code_1, code_2: values.code_2});
		});
	}


};

obj.init();

ipcRenderer.on('started', function(){
	obj.elements.mainstatus.innerHTML = "Status: Running...";
});

ipcRenderer.on('error', function(e, error){
	obj.elements.mainstatus.innerHTML = "Status: Error";
	console.log(error);
});

ipcRenderer.on('finished', function(e, fastest){
	obj.elements.mainstatus.innerHTML = "Status: Completed, "+fastest+" was quicker";
});
