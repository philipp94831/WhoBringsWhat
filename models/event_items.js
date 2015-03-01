var mongoose = require('mongoose');

var EventItemSchema = new mongoose.Schema({
  name: String,
  count: Number,
  bringer: String,
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

mongoose.model('EventItem', EventItemSchema);