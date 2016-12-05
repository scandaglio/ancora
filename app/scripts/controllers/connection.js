'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:ConnectionCtrl
 * @description
 * # ConnectionCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('ConnectionCtrl', function ($scope, $routeParams, $sce, airbnb, idealista, osm, pgt, area, naviglio, startend, $window) {
    var ratio = $window.innerWidth/$window.innerHeight;
    var videoRatio = 16/9;

    $scope.videoClass=ratio<=videoRatio?'videoH':'videoW'

    $scope.areaTitle = $routeParams.area;
    $scope.area = area;
    $scope.naviglio = naviglio;
    $scope.airbnb = airbnb;
    $scope.idealista = idealista;
    $scope.osm = osm

    var areas = [
      {slug:'melchiorre', label:'Melchiorre Gioia'},
      {slug:'isola', label:'Isola / Porta Nuova'},
      {slug:'centro', label:'Centro Storico'},
      {slug:'darsena', label:'Darsena'}
    ];

    var indexArea;
    areas.forEach(function(d,i){
      if(d.slug==$scope.areaTitle){
        indexArea = i;
      }
    });

    $scope.next = indexArea<(areas.length-1)?'cover/'+areas[indexArea+1].slug:'epilogo';
    $scope.nextLabel = indexArea<(areas.length-1)?areas[indexArea+1].label:'epilogo';
    $scope.prev = indexArea>(0)?'cover/'+areas[indexArea-1].slug:'prologo';
    $scope.prevLabel = indexArea>(0)?areas[indexArea-1].label:'prologo';

    $scope.pgtCategory = [
      'Cultura',
      'Istruzione',
      'Salute',
      'Servizi Sociali',
      'Amministrativo',
      'Attrezzature religiose',
      'Università e ricerca',
      'Sport',
      'Sicurezza e Protezione Civile',
      'Edilizia Residenziale Sociale',
      'Giustizia'
    ];

    $scope.osmCategory = [
      'ristorante',
      'bar',
      'banca',
      'distributore automatico',
      'taxi',
      'parcheggio',
      'pub',
      'fast food',
      'area gioco',
      'club',
      'società'
    ]

    // var myArray = []
    // $scope.osm.forEach(function(node){
    //   if(node.category == 'pub' || node.category == 'club' || node.category == 'fast food'){
    //     node.category = 'pub, club e fast food';
    //   }
    //   if(node.category == 'agenzia di viaggio' || node.category == 'agenzia immobilliare'){
    //     node.category = 'agenzie viaggi o immobilliari';
    //   }
    //   if(node.category == 'banca' || node.category == 'bancomat'){
    //     node.category = 'banche e bancomat';
    //   }
    //   if(node.category == 'farmacia'||node.category == 'ristoranti'||node.category == 'pub, club e fast food'||node.category =='banca'||node.category == 'acqua potabile'||node.category == 'agenzie viaggi o immobilliari'||node.category == 'taxi'||node.category == 'gelataio'||node.category == 'area gioco'||node.category == 'banche e bancomat' || node.category == 'società' ) {
    //     myArray.push(node)
    //   }
    // })
    // $scope.osm = myArray;

    $scope.pgt = pgt;
    $scope.startend = startend;
    $scope.startTime = startend.filter(function(d){return d.type == 'start'})[0].startTime;
    $scope.endTime = startend.filter(function(d){return d.type == 'end'})[0].startTime;

    $scope.chartOsm = formatData($scope.osm, 'category');
    $scope.chartPgt = formatData($scope.pgt, 'category');

    $scope.chartRent = [
      { key: 'airbnb', value: $scope.airbnb.length},
      { key: 'idealista', value: $scope.idealista.length}
    ]


    $scope.onPlayerReady = function(API) {
      $scope.videoAPI = API;
      $scope.videoAPI.seekTime(+$scope.startTime);
    };

    $scope.videoconfig = {
      sources: [
        {src: $sce.trustAsResourceUrl("videos/path.mp4"), type: "video/mp4"}
      ]
    }

    $scope.onUpdateTime = function(currentTime, totalTime) {
      $scope.currentTime = currentTime;
      if($scope.currentTime >= +$scope.endTime){
        $scope.videoAPI.pause()
      }
    };

    function formatData(data, accessor){
      var data = d3.nest()
        .key(function(d){return d[accessor]})
        .rollup(function(leave){
          return leave.length;
        })
        .entries(data)

      data = data.sort(function(a,b){return d3.descending(a.value,b.value)})
      return data;
    }
  });
