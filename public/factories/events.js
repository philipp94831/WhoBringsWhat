app.factory('events', ['$http', function($http){
  var o = {
    events: []
  };

  o.getAll = function() {
    return $http.get('/api/events').success(function(data){
      angular.copy(data, o.events);
    });
  };

  o.create = function(event) {
    return $http.post('/api/events', event).success(function(data){
      o.events.push(data);
    });
  };

  o.get = function(id) {
    return $http.get('/api/events/' + id).then(function(res){
      return res.data;
    });
  };

  o.addItem = function(id, item) {
    return $http.post('/api/events/' + id + '/items', item);
  };

  return o;
}]);