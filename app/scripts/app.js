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
        controllerAs: 'prologo'
      })
      .when('/cover/:area', {
        templateUrl: 'views/cover.html',
        controller: 'CoverCtrl',
        controllerAs: 'cover'
      })
      .when('/connection/:area', {
        templateUrl: 'views/connection.html',
        controller: 'ConnectionCtrl',
        controllerAs: 'connection'
      })
      .when('/epilogo', {
        templateUrl: 'views/epilogo.html',
        controller: 'EpilogoCtrl',
        controllerAs: 'epilogo'
      })
      .when('/prologo', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
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
      .otherwise({
        redirectTo: '/'
      });
  });
