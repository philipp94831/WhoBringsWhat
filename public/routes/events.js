app.config([
'$stateProvider',
function($stateProvider) {

  $stateProvider
    .state('events', {
      url: '/events',
      template: '<ui-view />',
      resolve: {
        event: function() {
          return {}
        }
      }
    })
    .state('events.show', {
      url: '/{id}',
      templateUrl: '/partials/events/show',
      controller: 'EventsController',
      resolve: {
        event: ['$stateParams', 'events', function($stateParams, events) {
          return events.get($stateParams.id);
        }]
      }
    })
    .state('events.new', {
      url: '/new',
      templateUrl: '/partials/events/new',
      controller: 'EventsController'
    });

}]);