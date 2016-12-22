app.controller('VisualisationController', function ($scope, $state, VisDataSet, $http) {
    // load the JSON file containing the Gephi network.
    $http.get('graph.json')
        .then(function (res) {
            $scope.data = res.data;
        });

    $scope.events = {};
    $scope.visAvailable = false;
    $scope.visProgress = 0;
    $scope.selectedNode = {};
    $scope.selectedNodeArray = [];

    $scope.options = {
        autoResize: true,
        clickToUse: true,
        height: '700',
        width: '100%',
        interaction: {
            hover: true,
            navigationButtons: true,
            keyboard: {
                enabled: true,
                speed: {
                    zoom: 0.05
                }
            },
            tooltipDelay : 100
        },
        physics: {
            forceAtlas2Based: {
                gravitationalConstant: -260,
                centralGravity: 0.005,
                springLength: 230,
                springConstant: 0.18,
                avoidOverlap: 0.5
            },
            maxVelocity: 50,
            solver: 'forceAtlas2Based',
            timestep: 0.35,
            stabilization: {
                enabled: true,
                iterations: 200,
                updateInterval: 50,
                fit: true
            }
        },
        layout: {
            randomSeed: 34
        }
    };

    $scope.events.getInformation = function (obj) {
        $scope.$apply(function () {
            var nodesArray = $scope.data.nodes;
            var edgesArray = $scope.data.edges;

            $scope.selectedNode ={}
            $scope.selectedNodeArray = [];

            for (var i = 0; i < nodesArray.length; i++) {
                if (nodesArray[i].id == obj.nodes[0]) {
                    $scope.selectedNode = nodesArray[i];
                    break;
                } 
            }

            edgesArray.sort(function(a,b){
                return a.id - b.id
            })

            obj.edges.forEach(myEdge => {
                if(edgesArray[myEdge].source != $scope.selectedNode.label){
                    $scope.selectedNodeArray.push(edgesArray[myEdge].source)
                } else {
                    $scope.selectedNodeArray.push(edgesArray[myEdge].target)
                }
                
            })
            $scope.selectedNodeArray = $scope.selectedNodeArray.unique();
        })
    }

    $scope.events.stabilizationProgress = function () {
        $scope.visAvailable = false;
        var data = arguments[0]
        $scope.$apply(data => {
            $scope.visProgress = Math.round((arguments[0].iterations / arguments[0].total) * 100);
        });
    };

    $scope.events.stabilizationIterationsDone = function () {
        $scope.$apply(function () {
            $scope.visAvailable = true;
            $scope.visProgress = 100;
        })
    };
});