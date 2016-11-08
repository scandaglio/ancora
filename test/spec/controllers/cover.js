'use strict';

describe('Controller: CoverCtrl', function () {

  // load the controller's module
  beforeEach(module('ancoraApp'));

  var CoverCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoverCtrl = $controller('CoverCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CoverCtrl.awesomeThings.length).toBe(3);
  });
});
