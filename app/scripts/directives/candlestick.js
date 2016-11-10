'use strict';

/**
 * @ngdoc directive
 * @name ancoraApp.directive:candlestick
 * @description
 * # candlestick
 */
angular.module('ancoraApp')
  .directive('candlestick', function () {
    return {
      restrict: 'A',
      replace: false,
      scope: {
         data: '='
       },
      link: function postLink(scope, element, attrs) {

        var data = scope.data,
            container = d3.select(element[0]),
            chartHeight = attrs.height?+attrs.height:container.node().getBoundingClientRect().height,
            chartWidth = attrs.width?+attrs.width:container.node().getBoundingClientRect().width;


        var svg = container.append('svg')
              .attr("width", chartWidth)
              .attr("height", chartHeight),
            margin = {top: 10, right: 25, bottom: 10, left: 180},
            width = chartWidth - margin.left - margin.right,
            height = chartHeight - margin.top - margin.bottom;

        var x = d3.scaleLinear().rangeRound([0, width]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var median = d3.median(data, function(d) { return +d.price; });

        x.domain(d3.extent(data, function(d) { return +d.price; }));

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height/2 + ")")
            .call(d3.axisBottom(x).ticks(0));

        g.selectAll(".circle")
          .data([x.domain()[0],median,x.domain()[1]])
          .enter().append("circle")
            .attr("class", "circle")
            .attr("cx", function(d){return x(d)})
            .attr("cy", height/2)
            .attr("r", 2)
            .attr('fill', 'white')
            .attr('stroke', 'black')
            .filter(function(d,i){
              return i == 1
            })
            .attr("r", 4)

        g.append("text")
            .attr("class", "legendText")
            .attr("x", -15)
            .attr("y", (height/2))
            .attr("text-anchor", "end")
            .attr("alignment-baseline", "central")
            .text(attrs.legend)
            .attr('fill','white')

          g.selectAll(".legend")
            .data([x.domain()[0],median,x.domain()[1]])
            .enter().append("text")
              .attr("class", "legend")
              .attr("x", function(d){return x(d)})
              .attr("y", (height/2)+20)
              .attr("text-anchor", "middle")
              .text(function(d){return d})
              .attr('fill','white')
              .filter(function(d,i){
                return i == 1
              })
              .attr("y", (height/2)-10)
              .text(function(d){return d + '€'})
      }
    };
  });
