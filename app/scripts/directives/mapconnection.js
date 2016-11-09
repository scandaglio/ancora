'use strict';

/**
 * @ngdoc directive
 * @name ancoraApp.directive:mapconnection
 * @description
 * # mapconnection
 */
angular.module('ancoraApp')
  .directive('mapconnection', function (togeojsonFilter) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var center = turf.centroid(scope.area);

        mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';
        var map = new mapboxgl.Map({
            container: element[0],
            style: 'mapbox://styles/teo/ciu1f5enw00i52iol853ypazc',
            center: center.geometry.coordinates,
            minZoom:8,
            maxZoom:17,
            zoom: 13
        });

        var bbox = turf.bbox(scope.area);

        map.fitBounds([[
            bbox[0],
            bbox[1]
        ], [
            bbox[2],
            bbox[3]
        ]],{padding:10});

        map.on('load', function () {

          map.addSource("area", {
              "type": "geojson",
              "data": scope.area
          });

          map.addLayer({
              "id": "area",
              "type": "line",
              "source": "area",
              "layout": {
                "line-cap": "round",
                "line-join": "round"
              },
              "paint": {
                'line-color': '#f00',
                'line-width': 3
              }
          });

          map.addSource("naviglio", {
              "type": "geojson",
              "data": scope.naviglio
          });

          map.addLayer({
              "id": "naviglio",
              "type": "line",
              "source": "naviglio",
              "layout": {
                "line-cap": "round",
                "line-join": "round"
              },
              "paint": {
                'line-color': '#f00',
                'line-width': 3
              }
          });

          map.addSource("airbnb", {
              "type": "geojson",
              "data": togeojsonFilter(scope.airbnb, ['price'])
          });

          map.addLayer({
              "id": "airbnb",
              "type": "circle",
              "source": "airbnb",
              "paint": {
                'circle-color': '#0f0'
              }
          });

          map.addSource("idealista", {
              "type": "geojson",
              "data": togeojsonFilter(scope.idealista, ['price'])
          });

          map.addLayer({
              "id": "idealista",
              "type": "circle",
              "source": "idealista",
              "paint": {
                'circle-color': '#0f0'
              }
          });

          map.addSource("pgt", {
              "type": "geojson",
              "data": togeojsonFilter(scope.pgt, ['category'])
          });

          map.addLayer({
              "id": "pgt",
              "type": "circle",
              "source": "pgt",
              "paint": {
                'circle-color': '#00f'
              }
          });

          map.addSource("osm", {
              "type": "geojson",
              "data": togeojsonFilter(scope.osm, ['category'])
          });

          map.addLayer({
              "id": "osm",
              "type": "circle",
              "source": "osm",
              "paint": {
                'circle-color': '#00f'
              }
          });

          // map.setPaintProperty('water', 'fill-color', '#000');
          // map.setPaintProperty('building', 'fill-color', '#000');
          // map.setPaintProperty('landuse', 'fill-color', '#000');
          // map.setPaintProperty('road', 'line-color', '#000');

        });
      }
    };
  });
