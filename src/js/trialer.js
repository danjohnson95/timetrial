var Benchmark = require('benchmark'),
suite = new Benchmark.Suite;

var obj = {

	init: function(code_1, code_2){
		suite.add('test1', function(){
			eval(code_1);
		});
		suite.add('test2', function(){
			eval(code_2);
		});
		suite.on('cycle', function(e){
			console.log(String(e.target));
		});
		suite.on('complete', function(){
			console.log('Fastest is ' + this.filter('fastest').map('name'));
		});
		suite.run({'async': true});
	}

};

module.exports = obj;
