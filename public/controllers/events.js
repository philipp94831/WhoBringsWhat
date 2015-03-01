app.controller('EventsController', [
'$scope',
'$state',
'events',
'event',
'$translatePartialLoader',
function($scope, $state, events, event, $translatePartialLoader){

  $translatePartialLoader.addPart('events');

  $scope.event = event;

  $scope.submit = function() {
    console.log($scope.form);
  }

  $scope.addItem = function(){
    if($scope.name === '') { return; }
    events.addItem(event._id, {
      name: $scope.name,
      count: $scope.count,
      bringer: $scope.bringer
    }).success(function(item) {
      $scope.event.items.push(item);
    });
    $scope.body = '';
  };

  $scope.create = function(){
    if(!$scope.title || $scope.title === '') { return; }
    events.create({
      title: $scope.title,
      description: $scope.description,
    });
    $scope.title = '';
    $scope.description = '';
    $state.go('home');
  };

}]);