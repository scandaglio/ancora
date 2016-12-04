'use strict';

/**
 * @ngdoc directive
 * @name ancoraApp.directive:bgMapMini
 * @description
 * # bgMapMini
 */
 angular.module('ancoraApp')
   .directive('bgMapMini', function () {
     return {
       replace: false,
       restrict: 'A',
       link: function postLink(scope, element, attrs) {

       	mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';
 				var map = new mapboxgl.Map({
 				    container: element[0],
 				    center: [9.1859,45.4654],
 				    zoom: 12,
 			      maxZoom:16,
 			      minZoom:10,
             interactive:false,
 				    style: 'mapbox://styles/teo/ciu1f5enw00i52iol853ypazc'
 				});

         var bbox = turf.bbox(turf.featureCollection([
           scope.geometries['melchiorre'].features[0],
           scope.geometries['isola'].features[0],
           scope.geometries['centro'].features[0],
           scope.geometries['darsena'].features[0]
         ]));

         map.fitBounds([[
             bbox[0],
             bbox[1]
         ], [
             bbox[2],
             bbox[3]
         ]],{padding:20});

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
 				            'fill-color': '#fff',
 				            'fill-opacity': 0.8,
                     'fill-outline-color': 'black',
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
 				            'fill-color': '#fff',
 				            'fill-opacity': 0.8,
                     'fill-outline-color': 'black',
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
 				            'fill-color': '#fff',
 				            'fill-opacity': 0.8,
                     'fill-outline-color': 'black',
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
                    'fill-outline-color': 'black',
 				            'fill-color': '#fff',
 				            'fill-opacity': 0.8
 				        }
 				    });
             map.addSource('naviglio', {
 				        'type': 'geojson',
 				        'data': scope.geometries['naviglio']
 				    });

 				    map.addLayer({
 				        'id': 'naviglio',
 				        'type': 'line',
 				        'source': 'naviglio',
 				        'layout': {},
 				        'paint': {
 				            'line-width':2,
 				            'line-color':'#000'
 				        }
 				    });

             map.addLayer({
                 'id': 'melchiorre-text',
                 'type': 'symbol',
                 'source': 'melchiorre',
                 "layout": {
                     "text-field": "Melchiorre Gioia",
                     "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                     "text-size": 14,
                 },
                 "paint":{
                   "text-color": "#fff",
                   "text-halo-color": "#000000",
                   "text-halo-width": 2
                 }
             });

             map.addLayer({
                 'id': 'isola-text',
                 'type': 'symbol',
                 'source': 'isola',
                 "layout": {
                     "text-field": "Isola / Porta Nuova",
                     "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                     "text-size": 14,
                 },
                 "paint":{
                   "text-color": "#fff",
                   "text-halo-color": "#000000",
                   "text-halo-width": 2
                 }
             });

             map.addLayer({
                 'id': 'centro-text',
                 'type': 'symbol',
                 'source': 'centro',
                 "layout": {
                     "text-field": "Centro Storico",
                     "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                     "text-size": 14,
                 },
                 "paint":{
                   "text-color": "#fff",
                   "text-halo-color": "#000000",
                   "text-halo-width": 2
                 }
             });

             map.addLayer({
                 'id': 'darsena-text',
                 'type': 'symbol',
                 'source': 'darsena',
                 "layout": {
                     "text-field": "Darsena",
                     "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                     "text-size": 14,
                 },
                 "paint":{
                   "text-color": "#fff",
                   "text-halo-color": "#000000",
                   "text-halo-width": 2
                 }
             });

 				    map.setPaintProperty('water', 'fill-color', '#ccc');
 			      map.setPaintProperty('building', 'fill-color', '#ccc');
 			      map.setPaintProperty('landuse', 'fill-color', '#ccc');
 			      map.setPaintProperty('road', 'line-color', '#ccc');
 				});



 			// link
       }
     };
   });
