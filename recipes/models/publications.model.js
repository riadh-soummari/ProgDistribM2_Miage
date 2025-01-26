const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  instructions: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  cuisine: {
    type: String,
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' // Reference to the Comment schema
  }]
});

publicationSchema.index({ name: 'text', instructions: 'text' });

module.exports = mongoose.model('Publication', publicationSchema);