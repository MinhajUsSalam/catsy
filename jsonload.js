 ap = angular.module('app', []);
   

   

    ap.controller('mycontroller' , ['$scope','$http','$window', 'detailService',  function  ($scope, $http, $window, detailService){

        $scope.items = new Array
        $scope.counter = 0
        $scope.keys = new Array
        $scope.sub_items = new Array
        $scope.limit = 12
        $scope.total_pages = 0

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
            $scope.keys = Object.keys($scope.items)
            var ind = 0
                var temp = new Array
                for (var k in $scope.keys) {
                    console.log(ind)
                    temp.push({id: $scope.keys[ind], value: $scope.items[$scope.keys[ind]] })
                    ind++
                    if (ind == $scope.limit){
                        $scope.limit = $scope.limit + 12
                        $scope.sub_items.push(temp)
                        temp = []
                    }

                }
             $scope.total_pages = $scope.sub_items.length   
            console.log($scope.total_pages)
       },function (error){

       });

       $scope.getTotalitems = function(){
            return $scope.items;
        };

        $scope.get_image = function(key) {
            try{
                console.log(key)
                return $scope.items[key['id']]['assets'][0]['thumbnail_url']
            } catch(e) {
                console.log("Got an error!");
            }
        }

        $scope.navi = function(key) {
           detailService.saveDetail($scope.items,key) 

        }

        $scope.increment = function() {
            $scope.counter = $scope.counter + 1
        }

        $scope.curr_counter = function() {
            return $scope.counter
        }
        

    }]);

    ap.service('detailService', function() {

     var details = []   

      function saveDetail(items,key) {
          details = items[key['id']]
      };

      var loadDetail = function(){
          return details;
      };

      return {
        saveDetail: saveDetail,
        loadDetail: loadDetail
      };
    })

  ap.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }]);  

  ap.controller('detailcontroller', ['$scope', 'detailService', '$anchorScroll', function($scope,detailService,$anchorScroll) {
    
    $scope.features = new Array

    $scope.listDetail = function(){
        $scope.features = detailService.loadDetail()
    }

  }])

    