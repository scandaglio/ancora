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
      template: '',
      scope: {
        data: '=',
        ydomain: '='
      },
      link: function postLink(scope, element, attrs) {

        var data = scope.data,
            container = d3.select(element[0]),
            chartHeight = attrs.height?+attrs.height:container.node().getBoundingClientRect().height,
            chartWidth = attrs.width?+attrs.width:container.node().getBoundingClientRect().width,
            marginleft = attrs.marginleft?+attrs.marginleft:chartWidth/2;

        var svg = container.append('svg')
              .attr("width", chartWidth)
              .attr("height", chartHeight),
            margin = {top: 10, right: 25, bottom: 5, left: marginleft},
            width = chartWidth - margin.left - margin.right,
            height = chartHeight - margin.top - margin.bottom;

        var y = d3.scaleBand().rangeRound([0, height]).padding(0.1),
            x = d3.scaleLinear().rangeRound([0, width]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            if(scope.ydomain){
              data = data.filter(function(d){
                return scope.ydomain.indexOf(d.key)>-1;
              })
              y.domain(scope.ydomain);
            }else{
              y.domain(data.map(function(d) { return d.key; }));
            }
            x.domain([0, d3.max(data, function(d) { return d.value; })]);

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y));

            g.selectAll(".bar")
              .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return 0; })
                .attr("y", function(d) { return y(d.key); })
                .attr('fill', 'white')
                .attr("height", y.bandwidth())
                .attr("width", function(d) { return x(0); })
                .transition()
                .duration(500)
                .attr("width", function(d) { return x(d.value); })

            g.selectAll(".barValue")
              .data(data)
              .enter().append("text")
                .attr("class", "barValue")
                .attr("alignment-baseline", "central")
                .attr("text-anchor","end")
                .attr("x", function(d) {
                  if(x(d.value)<10){
                    return (x(d.value) + 8)
                  }else{
                    return (x(d.value) - 2)
                  }
                })
                .attr("y", function(d) { return y(d.key)+(y.bandwidth()/2); })
                .attr('fill', function(d){
                  if(x(d.value)<10){
                    return "white"
                  }else{
                    return "black"
                  }
                })
                .attr("opacity", 0)
                .text(function(d){
                    return d.value
                })
                .transition()
                .duration(500)
                .attr("opacity", 1)
      }
    };
  });
