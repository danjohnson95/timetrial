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
		}).add('test1', function(){
			eval(vals.code_1);
		}).add('test2', function(){
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
		obj.socket.send('finished', this.filter('fastest').map('name'));
	}

};

module.exports = obj;
