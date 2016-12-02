app.controller('EntrepriseController', function ($scope, $state, $http, $window) {
    // Some functions
    function containSecteur(secteur, items) {
        return items.includes(secteur)
    }

    function groupBySecteur(memo, item) {
        var secteur = memo.filter(containSecteur.bind(null, item.secteur));
        if (secteur.length == 0) {
            memo.push(item.secteur)
        }
        return memo.sort()
    }

    $http.get('entreprise.json')
        .then(function (res) {
            $scope.data = res.data;
            $scope.recherche = $scope.data;
            $scope.secteurs = $scope.data.reduce(groupBySecteur,["-- Tous les secteurs --"])
        });


    $scope.searchAction = function () {
        $scope.recherche = $scope.data;
        if ($scope.filiere == undefined && $scope.inputText == undefined && $scope.promo == undefined
            && $scope.secteur == undefined && $scope.taille == undefined) {
            $scope.recherche = $scope.data;
        } else {
            if ($scope.promo != undefined) {
                if($scope.promo != "Toutes promos"){
                    $scope.recherche = $scope.data.filter(entreprise => {
                        return entreprise.promo == $scope.promo;
                    })
                }

                if ($scope.filiere != undefined && $scope.filiere != "Toutes filières") {
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(entreprise => {
                        return entreprise.filiere.includes($scope.filiere)
                    })
                }

                if ($scope.secteur != undefined && $scope.secteur !="-- Tous les secteurs --") {
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(entreprise => {
                        return entreprise.secteur == $scope.secteur
                    })
                }

                if ($scope.taille != undefined && $scope.taille != "Toutes tailles") {
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(entreprise => {
                        return entreprise.nombre == $scope.taille
                    })
                }

                if ($scope.inputText != undefined && $scope.inputText.length > 0) {
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(entrepriseObject => {
                        var entreprise = entrepriseObject.entreprise.toLowerCase()
                        var localisation = entrepriseObject.localisation.toLowerCase()

                        var recherche = $scope.inputText.toLowerCase()

                        return ( recherche.includes(entreprise)
                            || recherche.includes(localisation)
                            || entreprise.includes(recherche)
                            || localisation.includes(recherche)
                        )
                    })

                }
            } else {
                if ($scope.filiere != undefined) {
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(entreprise => {
                        return entreprise.filiere == $scope.filiere
                    })
                }
                if ($scope.inputText != undefined) {
                    var tmpArray = $scope.recherche;
                    $scope.recherche = tmpArray.filter(entreprise => {
                        var nom = entreprise.nom.toLowerCase()
                        var prenom = entreprise.prenom.toLowerCase()
                        var entreprise = entreprise.entreprise.toLowerCase()
                        var localisation = entreprise.localisation.toLowerCase()

                        var recherche = $scope.inputText.toLowerCase()

                        return (recherche.includes(nom)
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