'use strict';

describe('Filter: togeojson', function () {

  // load the filter's module
  beforeEach(module('ancoraApp'));

  // initialize a new instance of the filter before each test
  var togeojson;
  beforeEach(inject(function ($filter) {
    togeojson = $filter('togeojson');
  }));

  it('should return the input prefixed with "togeojson filter:"', function () {
    var text = 'angularjs';
    expect(togeojson(text)).toBe('togeojson filter: ' + text);
  });

});
