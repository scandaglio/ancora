'use strict';

describe('Controller: EpilogoCtrl', function () {

  // load the controller's module
  beforeEach(module('ancoraApp'));

  var EpilogoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EpilogoCtrl = $controller('EpilogoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EpilogoCtrl.awesomeThings.length).toBe(3);
  });
});
