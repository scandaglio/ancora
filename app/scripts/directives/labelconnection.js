'use strict';

/**
 * @ngdoc directive
 * @name ancoraApp.directive:labelconnection
 * @description
 * # labelconnection
 */
angular.module('ancoraApp')
  .directive('labelconnection', function () {
    return {
      replace:false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        d3.select(element[0])
          .on('mouseover', function(d){
            var label = d3.select(element[0]).select('.labelConnection')
            label.style('display','inline')
          })
          .on('mouseout', function(d){
            var label = d3.select(element[0]).select('.labelConnection')
            label.style('display','none')
          })
      }
    };
  });
