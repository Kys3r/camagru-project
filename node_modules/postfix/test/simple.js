
var test = require('tape');
var postfix = require('../');

test('simple fetch', function(t) {
  t.equal(postfix('yorkiefixer@gmail.com'), 'gmail.com');
  t.equal(postfix('@@@gmail.com'), false);
  t.end();
})