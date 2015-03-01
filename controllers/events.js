var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var EventItem = mongoose.model('EventItem');

module.exports.set_event = function(req, res, next, id) {
  var query = Event.findById(id);

  query.exec(function (err, event){
    if (err) { return next(err); }
    if (!event) { return next(new Error('can\'t find event')); }

    req.event = event;
    return next();
  });
};

module.exports.set_item = function(req, res, next, id) {
  var query = EventItem.findById(id);

  query.exec(function (err, item){
    if (err) { return next(err); }
    if (!item) { return next(new Error('can\'t find item')); }

    req.item = item;
    return next();
  });
};

module.exports.get_all = function(req, res, next) {
  Event.find(function(err, events){
    if(err){ return next(err); }

    res.json(events);
  });
};

module.exports.create = function(req, res, next) {
  var event = new Event(req.body);

  event.save(function(err, event){
    if(err){ return next(err); }

    res.json(event);
  });
};

module.exports.get_event = function(req, res, next) {
  req.event.populate('items', function(err, event) {
    if (err) { return next(err); }

    res.json(event);
  });
};

module.exports.create_item = function(req, res, next) {
  var item = new EventItem(req.body);
  item.event = req.event;

  item.save(function(err, item){
    if(err){ return next(err); }

    req.event.items.push(item);
    req.event.save(function(err, event) {
      if(err){ return next(err); }

      res.json(item);
    });
  });
};