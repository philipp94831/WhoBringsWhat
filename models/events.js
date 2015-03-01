var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EventItem' }]
});

mongoose.model('Event', EventSchema);