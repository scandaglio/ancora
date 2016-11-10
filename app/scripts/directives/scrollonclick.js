'use strict';

/**
 * @ngdoc directive
 * @name ancoraApp.directive:scrollOnClick
 * @description
 * # scrollOnClick
 */
angular.module('ancoraApp')
  .directive('scrollOnClick', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.on('click', function(e) {
            e.preventDefault();
            $("body").animate({scrollTop: $(attrs.href).offset().top - 100}, "slow");
          });
      }
    };
  });
