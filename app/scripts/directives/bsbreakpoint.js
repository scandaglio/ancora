'use strict';

/**
 * @ngdoc directive
 * @name ancoraApp.directive:bsBreakpoint
 * @description
 * # bsBreakpoint
 */
angular.module('ancoraApp')
  .directive('bsBreakpoint', function ($window, $rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var getBreakpoint = function() {
                var windowWidth = $window.innerWidth;

                if(windowWidth < 768) {
                    return 'extra small';
                } else if (windowWidth >= 768 && windowWidth < 992) {
                    return 'small';
                } else if (windowWidth >= 992 && windowWidth < 1200) {
                    return 'medium';
                } else if (windowWidth >= 1200) {
                    return 'large';
                }
            };

            var currentBreakpoint = getBreakpoint();
            var previousBreakpoint = null;

            // Broadcast inital value, so other directives can get themselves setup
            $timeout(function() {
                $rootScope.$broadcast('windowResize', currentBreakpoint, previousBreakpoint);
            });

            angular.element($window).bind('resize', function() {
                var newBreakpoint = getBreakpoint();

                if (newBreakpoint != currentBreakpoint) {
                    previousBreakpoint = currentBreakpoint;
                    currentBreakpoint = newBreakpoint;
                }

                $rootScope.$broadcast('windowResize', currentBreakpoint, previousBreakpoint);
            });
      }
    };
  });
