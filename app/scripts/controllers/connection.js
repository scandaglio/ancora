'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:ConnectionCtrl
 * @description
 * # ConnectionCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('ConnectionCtrl', function ($scope, $routeParams, $sce, airbnb, idealista, osm, pgt, area, naviglio, startend) {
    $scope.area = area;
    $scope.naviglio = naviglio;
    $scope.airbnb = airbnb;
    $scope.idealista = idealista;
    $scope.osm = osm;
    $scope.pgt = pgt;
    $scope.startend = startend;
    $scope.startTime = startend.filter(function(d){return d.type == 'start'})[0].startTime;
    $scope.endTime = startend.filter(function(d){return d.type == 'end'})[0].startTime;

    $scope.chartOsm = formatData($scope.osm, 'category');
    $scope.chartPgt = formatData($scope.pgt, 'category');

    $scope.chartRent = [
      { key: 'airbnb', value: $scope.airbnb.length},
      { key: 'idealista', value: $scope.idealista.length}
    ]


    $scope.onPlayerReady = function(API) {
      $scope.videoAPI = API;
      $scope.videoAPI.seekTime(+$scope.startTime);
    };

    $scope.videoconfig = {
      sources: [
        {src: $sce.trustAsResourceUrl("videos/path.mp4"), type: "video/mp4"}
      ]
    }

    $scope.onUpdateTime = function(currentTime, totalTime) {
      $scope.currentTime = currentTime;
      if($scope.currentTime >= +$scope.endTime){
        $scope.videoAPI.pause()
      }
    };

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
