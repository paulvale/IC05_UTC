app.controller('AnnuaireController', function ($scope, $state, $http, $window) {
    $http.get('annuaire.json')
        .then(function (res) {
            $scope.data = res.data;
            $scope.recherche = $scope.data;
        });

    $scope.openProfile = function(urlEtudiant){
        console.log(urlEtudiant)
        $window.open(urlEtudiant, '_blank');
    };
});