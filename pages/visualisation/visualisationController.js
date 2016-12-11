app.controller('VisualisationController', function ($scope, $state, VisDataSet, $http) {
  // load the JSON file containing the Gephi network.
  $http.get('graphTest.json')
    .then(function (res) {
      $scope.data = res.data;
    });

 

  $scope.events = {};
  $scope.visAvailable = false;
  $scope.visProgress = 0;
  $scope.selectedNode = {};

  $scope.options = {
      autoResize: true,
      clickToUse: true,
      height: '700',
      width: '100%',
      interaction: {
          hover:true,
          navigationButtons: true,
          keyboard : {
            enabled:true,
            speed:{
                zoom : 0.05
            }
          }
      },
      physics: {
          forceAtlas2Based: {
              gravitationalConstant: -260,
              centralGravity: 0.005,
              springLength: 230,
              springConstant: 0.18
          },
          maxVelocity: 50,
          solver: 'forceAtlas2Based',
          timestep: 0.35,
          stabilization: {
              enabled: true,
              iterations: 200,
              updateInterval: 50,
              fit:true
          }
      },
      layout: {
          randomSeed: 34
      }
    };

    $scope.events.getInformation = function(obj){
        $scope.$apply(function(){
            var nodesArray = $scope.data.nodes;
        
            for(var i = 0; i < nodesArray.length; i++) {
                if(nodesArray[i].id == obj.nodes[0]) {
                    $scope.selectedNode = nodesArray[i];
                    break;
                }
            }
            console.log($scope.selectedNode);
        })
        
    }

    $scope.events.stabilizationProgress = function() {
        $scope.visAvailable = false;
        var data = arguments[0]
        $scope.$apply(data => {
            $scope.visProgress = Math.round((arguments[0].iterations / arguments[0].total) * 100);
        });
    };

    $scope.events.stabilizationIterationsDone = function() {
        $scope.$apply(function(){
          $scope.visAvailable = true;
          $scope.visProgress = 100;
        })
    };
});