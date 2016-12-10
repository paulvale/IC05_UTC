var app = angular.module('ic05App', ['ui.router', 'ngVis', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/presentation");

	$stateProvider
		.state('presentation', {
			url: '/presentation',
			templateUrl: 'pages/presentation/presentation.html',
			controller: 'PresentationController'
		})

		.state('methodologie', {
			url: '/methodologie',
			templateUrl: 'pages/methodologie/methodologie.html',
			controller: 'MethodologieController'
		})

		.state('resultat', {
			url: '/resultat',
			templateUrl: 'pages/resultat/resultat.html',
			controller: 'ResultatController'
		})

		.state('annuaire', {
			url: '/annuaire',
			templateUrl: 'pages/annuaire/annuaire.html',
			controller: 'AnnuaireController'
		})

		.state('entreprise', {
			url: '/entreprise',
			templateUrl: 'pages/entreprise/entreprise.html',
			controller: 'EntrepriseController'

		})

		.state('visualisation', {
			url: '/visualisation',
			templateUrl: 'pages/visualisation/visualisation.html',
			controller: 'VisualisationController'
		})

		.state('conclusion', {
			url: '/conclusion',
			templateUrl: 'pages/conclusion/conclusion.html',
			controller: 'ConclusionController'
		})
});

app.factory('EtudiantsFactory', function(){
	 var savedData = {}

 	function set(data) {
   		savedData = data;
 	}
 	function get() {
		 var tmp = savedData;
		 savedData = undefined
  		return tmp;
 	}

 	return {
  		set: set,
  		get: get
 	}
})
