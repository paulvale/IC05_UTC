app.controller('VisualisationController', function ($scope, $state, VisDataSet, $http) {
    // load the JSON file containing the Gephi network.
    $http.get('graphTest.json')
       .then(function(res){
          $scope.data = res.data;     
          console.log(res.data)           
        });
    
    $scope.onSelect = function(items) {
      // debugger;
      alert('select');
    };

    $scope.onClick = function(props) {
      //debugger;
      alert('Click');
    };

    $scope.onDoubleClick = function(props) {
      // debugger;
      alert('DoubleClick');
    };

    $scope.rightClick = function(props) {
      alert('Right click!');
      props.event.preventDefault();
    };
    
    $scope.options = {
      autoResize: true,
      height: '800',
      width: '100%'
    };

    console.log("load reussi")
    //$scope.data = gephiJSON;

});