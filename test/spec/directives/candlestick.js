'use strict';

describe('Directive: candlestick', function () {

  // load the directive's module
  beforeEach(module('ancoraApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<candlestick></candlestick>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the candlestick directive');
  }));
});
