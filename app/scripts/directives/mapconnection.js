'use strict';

/**
 * @ngdoc directive
 * @name ancoraApp.directive:mapconnection
 * @description
 * # mapconnection
 */
angular.module('ancoraApp')
  .directive('mapconnection', function (togeojsonFilter, $timeout) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var markerPlay;
        var opacityController = d3.select(element[0]).style('opacity',0);

        var startend = togeojsonFilter(scope.startend, ['type', 'startTime']);
        var startPoint = startend.features.filter(function(d){return d.properties.type == 'start'})[0],
            endPoint = startend.features.filter(function(d){return d.properties.type == 'end'})[0]

        var naviglioPoint = turf.explode(scope.naviglio).features.map(function(d){
          return d.geometry.coordinates
        })
        var naviglioLine = turf.lineString(naviglioPoint.reverse());
        //cut naviglio
        var sliced = turf.lineSlice(startPoint, endPoint, naviglioLine);
        var sliceLength = turf.lineDistance(sliced, 'kilometers');
        var sliceDuration = +endPoint.properties.startTime - +startPoint.properties.startTime;
        var distanceScale = d3.scaleLinear()
          .domain([+startPoint.properties.startTime, +endPoint.properties.startTime])
          .range([0, sliceLength])

        var center = turf.centroid(scope.area);

        mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';
        var map = new mapboxgl.Map({
            container: element[0],
            style: 'mapbox://styles/teo/ciu1f5enw00i52iol853ypazc',
            center: center.geometry.coordinates,
            interactive: false,
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
        ]],{padding:50});

        map.on('load', function () {

          // map.setPaintProperty('water', 'fill-color', 'rgba(0,0,0,0)');
          // map.setPaintProperty('building', 'fill-color', 'rgba(0,0,0,0)');
          // map.setPaintProperty('landuse', 'fill-color', 'rgba(0,0,0,0)');
          // map.setPaintProperty('road', 'line-color', 'rgba(0,0,0,0)');
          map.setLayoutProperty('road', 'visibility', 'none');
          map.setLayoutProperty('water', 'visibility', 'none');
          map.setLayoutProperty('building', 'visibility', 'none');
          map.setLayoutProperty('landuse', 'visibility', 'none');

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
                'line-color': 'rgba(255,255,255,1)',
                'line-width': 2
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
                'line-color': 'rgba(255,255,255,1)',
                'line-width': 1
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
                'circle-color': 'rgba(255,255,255,0.75)',
                "circle-radius": 2
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
                  'circle-color': 'rgba(255,255,255,0.75)',
                  "circle-radius": 2
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
                'circle-color': 'rgba(255,255,255,0.75)',
                "circle-radius": 2
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
                'circle-color': 'rgba(255,255,255,0.75)',
                "circle-radius": 2
              }
          });


          map.addSource("pointer", {
              "type": "geojson",
              "data": startPoint
          });

          map.addLayer({
              "id": "pointerBorder",
              "type": "circle",
              "source": "pointer",
              "paint": {
                'circle-color': '#000',
                "circle-radius": 7
              }
          });

          map.addLayer({
              "id": "pointer",
              "type": "circle",
              "source": "pointer",
              "paint": {
                'circle-color': '#fff'
              }
          });

          var el = d3.select(element[0]).append('div');
          el.attr("class","markerPlay");
          el.append('span')
            .attr("class", "glyphicon glyphicon-pause")

          el.on('click',function(d){
            scope.videoAPI.playPause();
            if(scope.videoAPI.currentState == 'play'){
              d3.select(this).select('.glyphicon')
                .classed('glyphicon-pause', true)
                .classed('glyphicon-play', false)
            }else{
              d3.select(this).select('.glyphicon')
                .classed('glyphicon-pause', false)
                .classed('glyphicon-play', true)
            }

          })

          markerPlay = new mapboxgl.Marker(el.node(),{'offset':[-12,-12]})
          	.setLngLat(startPoint.geometry.coordinates)
          	.addTo(map);

          opacityController
            .transition()
            .duration(500)
            .style('opacity', 1)

          $timeout(function(){
            scope.videoAPI.play();
          }, 1500);


        }); //end map load

        scope.$watch('currentTime', function(newValue, oldValue){
          if(newValue != oldValue && newValue ){
            if(newValue > distanceScale.domain()[0] && newValue < distanceScale.domain()[1]){
              var km = distanceScale(newValue);
              var newPoint = turf.along(sliced, km, 'kilometers');
              map.getSource('pointer').setData(newPoint);
              markerPlay.setLngLat(newPoint.geometry.coordinates)
            }
          }//end if change
        })
      }
    };
  });
