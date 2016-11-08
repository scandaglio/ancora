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
				    map.addSource('area1', {
				        'type': 'geojson',
				        'data': scope.geometries['area1']
				    });

				    map.addLayer({
				        'id': 'area1',
				        'type': 'fill',
				        'source': 'area1',
				        'layout': {},
				        'paint': {
				            'fill-color': '#088',
				            'fill-opacity': 0.8
				        }
				    });

				    map.addSource('area2', {
				        'type': 'geojson',
				        'data': scope.geometries['area2']
				    });

				    map.addLayer({
				        'id': 'area2',
				        'type': 'fill',
				        'source': 'area2',
				        'layout': {},
				        'paint': {
				            'fill-color': '#088',
				            'fill-opacity': 0.8
				        }
				    });

				    map.addSource('area3', {
				        'type': 'geojson',
				        'data': scope.geometries['area3']
				    });

				    map.addLayer({
				        'id': 'area3',
				        'type': 'fill',
				        'source': 'area3',
				        'layout': {},
				        'paint': {
				            'fill-color': '#088',
				            'fill-opacity': 0.8
				        }
				    });

				    map.addSource('area4', {
				        'type': 'geojson',
				        'data': scope.geometries['area4']
				    });

				    map.addLayer({
				        'id': 'area4',
				        'type': 'fill',
				        'source': 'area4',
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
