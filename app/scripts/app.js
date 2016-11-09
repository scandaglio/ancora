'use strict';

/**
 * @ngdoc overview
 * @name ancoraApp
 * @description
 * # ancoraApp
 *
 * Main module of the application.
 */
angular
  .module('ancoraApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/prologo', {
        templateUrl: 'views/prologo.html',
        controller: 'PrologoCtrl',
        controllerAs: 'prologo',
        resolve: {
          area1: function (apiService) {
            return apiService.getFile('data/area1.json')
          },
          area2: function (apiService) {
            return apiService.getFile('data/area2.json')
          },
          area3: function (apiService) {
            return apiService.getFile('data/area3.json')
          },
          area4: function (apiService) {
            return apiService.getFile('data/area4.json')
          }
        }
      })
      .when('/cover/:area', {
        templateUrl: 'views/cover.html',
        controller: 'CoverCtrl',
        controllerAs: 'cover'
      })
      .when('/connection/:area', {
        templateUrl: 'views/connection.html',
        controller: 'ConnectionCtrl',
        controllerAs: 'connection',
        resolve: {
          airbnb: function (apiService, $route) {
            return apiService.getFile('data/airbnb.tsv', $route.current.params.area)
          },
          idealista: function (apiService, $route) {
            return apiService.getFile('data/idealista.tsv', $route.current.params.area )
          },
          osm: function (apiService, $route) {
            return apiService.getFile('data/osm.tsv', $route.current.params.area )
          },
          pgt: function (apiService, $route) {
            return apiService.getFile('data/pgt.tsv', $route.current.params.area )
          },
          area: function (apiService, $route) {
            return apiService.getFile('data/'+$route.current.params.area+'.json' )
          },
          naviglio: function (apiService, $route) {
            return apiService.getFile('data/naviglio.json' )
          },
          startend: function (apiService, $route) {
            return apiService.getFile('data/startend.tsv',$route.current.params.area)
          }
        }
      })
      .when('/epilogo', {
        templateUrl: 'views/epilogo.html',
        controller: 'EpilogoCtrl',
        controllerAs: 'epilogo'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
