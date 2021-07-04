const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    label: String,
    image: String,
    ingredientLines:Array,
  });

const foodModel = mongoose.model('test', foodSchema);

module.exports = foodModel;