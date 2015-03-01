app.controller('ApplicationController', [
'$scope',
'events',
'$translate',
'$translatePartialLoader',
function($scope, events, $translate, $translatePartialLoader){
   
  $translatePartialLoader.addPart('home');

  $scope.events = events.events;

}]);