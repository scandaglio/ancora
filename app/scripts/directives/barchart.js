'use strict';

/**
 * @ngdoc directive
 * @name ancoraApp.directive:barchart
 * @description
 * # barchart
 */
angular.module('ancoraApp')
  .directive('barchart', function () {
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
            margin = {top: 20, right: 20, bottom: 30, left: 120},
            width = chartWidth - margin.left - margin.right,
            height = chartHeight - margin.top - margin.bottom;

        var y = d3.scaleBand().rangeRound([0, height]).padding(0.1),
            x = d3.scaleLinear().rangeRound([0, width]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            y.domain(data.map(function(d) { return d.key; }));
            x.domain([0, d3.max(data, function(d) { return d.value; })]);


            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(5));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))

            g.selectAll(".bar")
              .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return 0; })
                .attr("y", function(d) { return y(d.key); })
                .attr("height", y.bandwidth())
                .attr("width", function(d) { return x(d.value); });
      }
    };
  });
