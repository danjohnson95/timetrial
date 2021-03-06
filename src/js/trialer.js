var Benchmark = require('benchmark');
const {ipcMain} = require('electron');

var obj = {

	socket: null,

	init: function(vals, e){
		obj.socket = e;
		var suite = new Benchmark.Suite(vals.title, {
			'onStart': obj.started,
			'onCycle': obj.cycle,
			'onError': obj.error,
			'onComplete': obj.finished
		}).add('test_1', function(){
			eval(vals.code_1);
		}).add('test_2', function(){
			eval(vals.code_2);
		}).run({'async': true});
	},

	started: function(){
		obj.socket.send('started', {});
	},

	cycle: function(e){
		//this.e.send('started', {});
		console.log(String(e.target));
	},

	error: function(e){
		obj.socket.send('error', e);
	},

	finished: function(){
		if(this.filter('fastest').map('name').length){
			obj.socket.send('finished', this.filter('fastest').map('name'));
		}else{
			obj.error(null);
		}

	}

};

module.exports = obj;
