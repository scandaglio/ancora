'use strict';

describe('Directive: scrollOnClick', function () {

  // load the directive's module
  beforeEach(module('ancoraApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scroll-on-click></scroll-on-click>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrollOnClick directive');
  }));
});
