var app = angular.module('ic05App', ['ui.router']);

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

		.state('visualisation', {
			url: '/visualisation',
			templateUrl: 'pages/visualisation/visualisation.html',
			controller: 'VisualisationController'
		})
});
