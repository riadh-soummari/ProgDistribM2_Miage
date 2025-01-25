const express = require("express");
const router = express.Router();
const axios = require('axios');
const Recipe = require('../models/recipes.model');
const Publication = require('../models/publications.model');
const authMiddleware = require('../middlewares/authenticate.middleware');

router.use(authMiddleware.isAuthenticated());

router.get('/search-recipe', async (req, res) => {
    try {
        console.log(req.query.f);
        
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: '7bc8a3ebad7d44659e35a3117b276393',
                query: req.query.f,
                number: 1
            }
        });

        const searchResults = response.data.results;
        console.log(searchResults);
        const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

        if (isPostman) {
            res.json({ searchResults });
        } else {
            res.render('recipes_gallery', { searchResults });
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/findByIngredients', async (req, res) => {
    try {
        console.log(req.query.f);
        
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
            apiKey: '7bc8a3ebad7d44659e35a3117b276393', 
            ingredients: req.query.f, 
            number: 1, 
            ranking: 1 
        }
    });
    const searchResults = response.data;
    console.log(searchResults);
    const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

        if (isPostman) {
            res.json({ searchResults });
        } else {
            res.render('recipes_gallery', { searchResults });
        }

    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/recipe/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;

        let recipe = await Recipe.findOne({ apiId: recipeId });

        if (!recipe) {
            
            const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
                params: {
                    apiKey: '7bc8a3ebad7d44659e35a3117b276393', 
                    includeNutrition: false 
                }
            });
            const recipeData = response.data;
            console.log(recipeData);

            const mappedRecipe = {
                apiId: recipeData.id,
                title: recipeData.title,
                ingredients: recipeData.extendedIngredients.map(ingredient => `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`),
                instructions: recipeData.instructions,
                cuisine: recipeData.cuisines.join(', '), 
                image: recipeData.image
            };

            // Upsert recipe in the database with the same ID as in the API response
            recipe = await Recipe.findOneAndUpdate(
                { apiId: recipeId },
                mappedRecipe,
                { upsert: true, new: true }
            );
        }
        const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

        if (isPostman) {
            res.json({ recipe });
        } else {
            res.render('recipe', { recipe });
        }

        
    } catch (error) {
        console.error('Error fetching and rendering recipe:', error);
        res.status(500).send('Internal server error');
    }
});

router.post('/recipe/:id', async (req, res) => {
    try {

        const recipeId = req.params.id;

        let recipe = await Recipe.findOne({ apiId: recipeId });

        const newPublication = new Publication({
          name: recipe.title,
          instructions: recipe.instructions,
          user: req.session.userId,
          ingredients: recipe.ingredients,
          cuisine: recipe.cuisine,
          image: recipe.image
        });
    
        
        await newPublication.save();

        const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

        if (isPostman) {
            res.json({ newPublication });
        } else {
            res.redirect('/');
        }
       
      } catch (error) {
        console.error('Error adding publication:', error);
        res.status(500).json({ success: false, message: 'Failed to add publication' });
      }
    })

module.exports = router;

