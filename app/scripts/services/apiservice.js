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
      getFile : function(url, filter){
         var deferred = $q.defer();
         $http.get(url).success(function(data){
           if(filter){
             var out = d3.tsvParse(data).filter(function(d){return d.area == filter})
             deferred.resolve(out);
           }else{
             deferred.resolve(data);
           }
         }).error(function(){
           deferred.reject("An error occured while fetching file");
         });

         return deferred.promise;
       }
    }
  });
