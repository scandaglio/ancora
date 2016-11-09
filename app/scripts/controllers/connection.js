'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:ConnectionCtrl
 * @description
 * # ConnectionCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('ConnectionCtrl', function ($scope, $routeParams, airbnb, idealista, osm, pgt, area, naviglio, startend) {
    $scope.area = area;
    $scope.naviglio = naviglio;
    $scope.airbnb = airbnb;
    $scope.idealista = idealista;
    $scope.osm = osm;
    $scope.pgt = pgt;
    $scope.startend = startend;

    $scope.chartOsm = formatData($scope.osm, 'category');
    $scope.chartPgt = formatData($scope.pgt, 'category');

    $scope.chartRent = [
      { key: 'airbnb', value: $scope.airbnb.length},
      { key: 'idealista', value: $scope.idealista.length}
    ]

    function formatData(data, accessor){
      var data = d3.nest()
        .key(function(d){return d[accessor]})
        .rollup(function(leave){
          return leave.length;
        })
        .entries(data)

      data = data.sort(function(a,b){return d3.descending(a.value,b.value)})
      return data;
    }
  });
