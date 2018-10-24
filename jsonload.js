 ap = angular.module('app', []);
   

   

    ap.controller('mycontroller' , ['$scope','$http','$window', 'detailService',  function  ($scope, $http, $window, detailService){

        $scope.items = new Array
        $scope.counter = 0
        

        var request = {
                method: 'get',
                url: 'Items.json',
                dataType: 'json',
                contentType: "application/json"
            };

       $http({
          method: 'GET',
          url: 'Items.json'
       }).then(function (response){
            $scope.items = response['data']
       },function (error){

       });

       $scope.getTotalitems = function(){
            return $scope.items;
        };

        $scope.get_image = function(key) {
            return $scope.items[key]['assets'][0]['thumbnail_url']
        }

        $scope.navi = function(key) {
           detailService.saveDetail($scope.items,key) 

        }
        

    }]);

    ap.service('detailService', function() {

     var details = []   

      function saveDetail(items,key) {
          details = items[key]
      };

      var loadDetail = function(){
          return details;
      };

      return {
        saveDetail: saveDetail,
        loadDetail: loadDetail
      };
    })

      ap.controller('detailcontroller', ['$scope', 'detailService', '$anchorScroll', function($scope,detailService,$anchorScroll) {
        
        $scope.features = new Array

        $scope.listDetail = function(){
            $scope.features = detailService.loadDetail()
        }

        $anchorScroll()

      }])

    