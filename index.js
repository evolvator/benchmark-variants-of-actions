var Benchmark = require('benchmark');
var tb = require('travis-benchmark');
var _ = require('lodash');
var async = require('async');
var foreach = require('foreach');
var arrayEach = require('array-each');

var suite = new Benchmark.Suite(`variants of actions`);

var f = function() {};

var functions = {
  c: f
};

suite.add('switch', function() {
  var selected = 'c';
  switch (selected) {
    case 'a': return f();
    case 'b': return f();
    case 'c': return f();
    case 'd': return f();
    case 'e': return f();
  }
});
suite.add('if', function() {
  var selected = 'c';
  if (selected === 'a') return f();
  if (selected === 'b') return f();
  if (selected === 'c') return f();
  if (selected === 'd') return f();
  if (selected === 'e') return f();
});
suite.add('hash-of-functions', function() {
  var selected = 'c';
  functions[selected]();
});

tb.wrapSuite(suite);
suite.run({ async: true });
