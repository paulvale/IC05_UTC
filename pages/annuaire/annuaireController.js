app.controller('AnnuaireController', function ($scope, $state, $http) {
    $http.get('annuaire.json')
        .then(function (res) {
            $scope.data = res.data;
            console.log(res.data)
        });
});