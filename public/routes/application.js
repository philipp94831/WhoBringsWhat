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
    });

  $urlRouterProvider.otherwise('home');

}]);