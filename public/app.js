var app = angular.module('WhoBringsWhat', ['ngCookies', 'pascalprecht.translate', 'ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/partials/home/index',
      controller: 'ApplicationController',
      resolve: {
        eventsPromise: ['events', function(events){
          return events.getAll();
        }]
      }
    })
    .state('events', {
      template: '<ui-view />',
      resolve: {
        event: function() {
          return {}
        }
      }
    })
    .state('events.show', {
      url: '/events/{id}',
      templateUrl: '/partials/events/show',
      controller: 'EventsController',
      resolve: {
        event: ['$stateParams', 'events', function($stateParams, events) {
          return events.get($stateParams.id);
        }]
      }
    })
    .state('events.new', {
      url: '/events/new',
      templateUrl: '/partials/events/new',
      controller: 'EventsController'
    });

  $urlRouterProvider.otherwise('home');

}]);

app.config([
'$translateProvider',
'$translatePartialLoaderProvider',
function($translateProvider, $translatePartialLoaderProvider) {

  $translateProvider.determinePreferredLanguage();
  $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
  
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/locales/{part}/{lang}.json'
  });

}]);

app.run(function ($rootScope, $translate) {
  $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
    $translate.refresh();
  });
});