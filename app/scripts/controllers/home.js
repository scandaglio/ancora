'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.title = 'Scandaglio Acquatico'
    $scope.abstract = 'Ogni capitale europea che si rispetti è attraversata da un corso d’acqua importante, si pensi a Parigi o a Londra, che fanno impallidire, per volumi e bacino idrografico la tanto decantata bellezza de La Darsena di Milano, un’opera di opinabile fattura, in fin dei conti, e tutto sommato ridicola dal punto di vista della sua travagliata storia di infiniti cantieri e di progetti discussi e poi abbandonati, sino all’ultima sua frettolosa realizzazione nell’anno di Expo 2015, che ha portato alla sua valorizzazione di luogo, eretto a simbolo, il vero Expo in città, della trasformazione in corso per i preparativi al grande evento.'
  });
