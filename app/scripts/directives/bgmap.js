'use strict';

/**
 * @ngdoc directive
 * @name ancoraApp.directive:bgMap
 * @description
 * # bgMap
 */
angular.module('ancoraApp')
  .directive('bgMap', function () {
    return {
      template: "<div id='map' style='width: 100%; height: 100%;'></div>",
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      	mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';
				var map = new mapboxgl.Map({
				    container: 'map',
				    center: [9.1859,45.4654],
				    zoom: 12,
			      maxZoom:16,
			      minZoom:12,
				    style: 'mapbox://styles/teo/ciu1f5enw00i52iol853ypazc'
				});

				map.on('load', function () {
				    map.addSource('melchiorre', {
				        'type': 'geojson',
				        'data': scope.geometries['melchiorre']
				    });

				    map.addLayer({
				        'id': 'melchiorre',
				        'type': 'fill',
				        'source': 'melchiorre',
				        'layout': {},
				        'paint': {
				            'fill-color': '#088',
				            'fill-opacity': 0.8
				        }
				    });

				    map.addSource('isola', {
				        'type': 'geojson',
				        'data': scope.geometries['isola']
				    });

				    map.addLayer({
				        'id': 'isola',
				        'type': 'fill',
				        'source': 'isola',
				        'layout': {},
				        'paint': {
				            'fill-color': '#088',
				            'fill-opacity': 0.8
				        }
				    });

				    map.addSource('centro', {
				        'type': 'geojson',
				        'data': scope.geometries['centro']
				    });

				    map.addLayer({
				        'id': 'centro',
				        'type': 'fill',
				        'source': 'centro',
				        'layout': {},
				        'paint': {
				            'fill-color': '#088',
				            'fill-opacity': 0.8
				        }
				    });

				    map.addSource('darsena', {
				        'type': 'geojson',
				        'data': scope.geometries['darsena']
				    });

				    map.addLayer({
				        'id': 'darsena',
				        'type': 'fill',
				        'source': 'darsena',
				        'layout': {},
				        'paint': {
				            'fill-color': '#088',
				            'fill-opacity': 0.8
				        }
				    });

				    map.addSource('naviglio', {
				        'type': 'geojson',
				        'data': scope.geometries['naviglio']
				    });

				    map.addLayer({
				        'id': 'naviglio',
				        'type': 'fill',
				        'source': 'naviglio',
				        'layout': {},
				        'paint': {
				            'fill-color':'rgba(0,0,0,0)',
				            'fill-outline-color':'#000'
				        }
				    });

				    map.setPaintProperty('water', 'fill-color', '#000');
			      map.setPaintProperty('building', 'fill-color', '#000');
			      map.setPaintProperty('landuse', 'fill-color', '#000');
			      map.setPaintProperty('road', 'line-color', '#000');
				});



			// link
      }
    };
  });
