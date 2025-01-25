const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    apiId: { type: Number, required: true, unique: true }, 
    title: { type: String, required: true },
    ingredients: { type: [String], required: true }, 
    instructions: { type: String, required: true },
    cuisine: { type: String },
    image: { type: String, required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
