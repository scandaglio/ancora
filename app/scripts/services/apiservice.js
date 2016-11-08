'use strict';

/**
 * @ngdoc service
 * @name ancoraApp.apiService
 * @description
 * # apiService
 * Service in the ancoraApp.
 */
angular.module('ancoraApp')
  .service('apiService', function ($q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      getFile : function(url){
         var deferred = $q.defer();
         $http.get(url).success(function(data){
           deferred.resolve(data);
         }).error(function(){
           deferred.reject("An error occured while fetching file");
         });

         return deferred.promise;
       }
    }
  });
