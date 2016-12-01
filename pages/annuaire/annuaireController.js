app.controller('AnnuaireController', function ($scope, $state, $http, $window) {
    $http.get('annuaire.json')
        .then(function (res) {
            $scope.data = res.data;
            $scope.recherche = $scope.data;
        });

    $scope.openProfile = function(urlEtudiant){
        $window.open(urlEtudiant, '_blank');
    };

    $scope.searchAction = function(){
        $scope.recherche = $scope.data;
        if($scope.filiere == undefined && $scope.inputText == undefined && $scope.promo == undefined) {
            $scope.recherche = $scope.data;
        } else {
            if($scope.promo != undefined){
                $scope.recherche =  $scope.data.filter(etudiant => {
                    return etudiant.promo == $scope.promo;
                })

                if($scope.filiere != undefined){
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(etudiant => {
                        return etudiant.filiere == $scope.filiere
                    })
                }
                if($scope.inputText != undefined){
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(etudiant => {
                        var nom = etudiant.nom.toLowerCase()
                        var prenom =  etudiant.prenom.toLowerCase()
                        var entreprise = etudiant.entreprise.toLowerCase()
                        var localisation =  etudiant.localisation.toLowerCase()

                        var recherche = $scope.inputText.toLowerCase()

                        return ( recherche.includes(nom)
                                || recherche.includes(prenom)
                                || recherche.includes(entreprise)
                                || recherche.includes(localisation)
                                || nom.includes(recherche)
                                || prenom.includes(recherche)
                                || entreprise.includes(recherche)
                                || localisation.includes(recherche)
                        )
                    })

                }
            } else {
                if($scope.filiere != undefined){
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(etudiant => {
                        return etudiant.filiere == $scope.filiere
                    })
                }
                if($scope.inputText != undefined){
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(etudiant => {
                        var nom = etudiant.nom.toLowerCase()
                        var prenom =  etudiant.prenom.toLowerCase()
                        var entreprise = etudiant.entreprise.toLowerCase()
                        var localisation =  etudiant.localisation.toLowerCase()

                        var recherche = $scope.inputText.toLowerCase()

                        return ( recherche.includes(nom)
                                || recherche.includes(prenom)
                                || recherche.includes(entreprise)
                                || recherche.includes(localisation)
                                || nom.includes(recherche)
                                || prenom.includes(recherche)
                                || entreprise.includes(recherche)
                                || localisation.includes(recherche)
                        )
                    })

                }

            }
        }
    }
});