var Benchmark = require('benchmark');
var tb = require('travis-benchmark');
var _ = require('lodash');
var async = require('async');
var foreach = require('foreach');
var arrayEach = require('array-each');

var suite = new Benchmark.Suite(`variants of actions`);

var f = function() {};
var functions = {};
for (var i = 0; i < 1000; i++) {
  functions[i] = f;
}

eval(`suite.add('switch', function() { var s = '999'; switch (s) { ${_.map(functions, function(v, k) { return `case '${k}': return f();`; })} } });`);
eval(`suite.add('if', function() { var s = '999'; ${_.map(functions, function(v, k) { return `if (s == '${k}') return f();`; })} });`);
suite.add('hash-of-functions', function() {
  var s = '999';
  functions[s]();
});

tb.wrapSuite(suite);
suite.run({ async: true });
