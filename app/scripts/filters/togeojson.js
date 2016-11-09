'use strict';

/**
 * @ngdoc filter
 * @name ancoraApp.filter:togeojson
 * @function
 * @description
 * # togeojson
 * Filter in the ancoraApp.
 */
angular.module('ancoraApp')
  .filter('togeojson', function () {
    return function (input, properties) {
      var fc = [];
      input.forEach(function(d){
        var props = {}
        properties.forEach(function(e){
          props[e] = d[e];
        })
        fc.push(turf.point([+d.lon, +d.lat], props));
      })

      fc = turf.featureCollection(fc);

      return fc;
    };
  });
