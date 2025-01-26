const Publication = require('../models/publications.model');
const Comment = require('../models/comments.model');

/**
 * GET /
 * Homepage 
*/
exports.index = async(req, res) => {
  try{
    const limitNumber = 5;
    const latest = await Publication.find({}).sort({_id: -1}).limit(limitNumber);
    const food = { latest };
    res.render('index', { food, isAuth:req.isAuthenticated() } );
  }catch(err){
    res.send(err);
  }
}

exports.explorePublication = async (req, res) => {
  try {
    const publicationId = req.params.id;
    const publication = await Publication.findById(publicationId)
    .populate('user', 'username')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'username'
      }
    });
    //res.json({ publication });
    // Check if the request is coming from Postman
    const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

    if (isPostman) {
      res.json({ publication });
    } else {
  
      res.render('publication', { publication });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};


/**
 * POST /search
 * Search 
*/
exports.searchPublication = async(req, res) => {
  try {
    let searchTerm = req.query.f;
    let publication = await Publication.find({ $text: { $search: searchTerm } });
    const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

    if (isPostman) {
      res.json({ publication });
    } else {
  
      res.render('search', { publication } );
    }
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const publication = await Publication.find({}).sort({ _id: -1 }).limit(limitNumber);
    const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

    if (isPostman) {
      res.json({ publication });
    } else {
  
      res.render('explore-latest', { publication } );
    }
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /submit-publication
 * Submit Publication
*/

exports.submitPublicationPage = async(req, res) => {
  res.render('submit-publication');
}

exports.updatePublicationPage = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    res.render('update-publication', { publication });
  } catch (error) {
    console.error('Error finding publication:', error);
    res.status(500).send('Error finding publication');
  }
}

/**
 * POST /submit-publication
 * Submit Publication
*/
exports.submitPublicationOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);
      })

    }

  
     const ingredientsString = req.body.ingredients;

    
     const ingredients = ingredientsString.split(',').map(ingredient => ingredient.trim());
 
     
     console.log(ingredients);

    const newPublication = new Publication({
      name: req.body.name,
      instructions: req.body.instructions,
      user: req.session.userId,
      ingredients: ingredients,
      cuisine: req.body.cuisine,
      image: newImageName
    });

    
    await newPublication.save();

    const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

    if (isPostman) {
      res.json({ newPublication });
    } else {
      res.redirect('/submit-publication');
    }
   
    
  } catch (error) {
    console.error('Error adding publication:', error);
    res.status(500).json({ success: false, message: 'Failed to add publication' });
  }
}

exports.addComment = async (req, res) => {
  try {
    const { commentText } = req.body;
    const userId = req.session.userId;
    const publicationId = req.params.id;

    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(404).json({ success: false, message: 'Publication not found' });
    }

    const newComment = new Comment({
      text: commentText,
      user: userId
    });

    await newComment.save();

    publication.comments.push(newComment);
    await publication.save();
    const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

    if (isPostman) {
        res.status(201).json({ 
        success: true, 
        message: 'Comment added to publication successfully',
        publication: publication
      });
    } else {
      res.redirect(`/publication/${publicationId}`);
    }
  } catch (error) {
    console.error('Error adding comment to publication:', error);
    res.status(500).json({ success: false, message: 'Failed to add comment to publication' });
  }
};


exports.updatePublication = async (req, res) => {
  try {
    const publicationId = req.params.id;
    console.log(req.session.userId);
    // Find the publication by ID
    const publication = await Publication.findById(publicationId);
    console.log(publication.user.toString());
    // Check if the publication exists
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    // Check if the current user is the author of the publication
    if (publication.user.toString() !== req.session.userId) {
      return res.status(403).json({ error: 'You are not authorized to update this publication' });
    }

    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      // No new image provided, retain the existing image
      newImageName = publication.image;
    } else {
      // New image provided, handle the file upload
      const imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      const uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      await imageUploadFile.mv(uploadPath);
    }

    const ingredientsString = req.body.ingredients;

    const ingredients = ingredientsString.split(',').map(ingredient => ingredient.trim());

    console.log(ingredients);

    const updatedPublication = {
      name: req.body.name,
      instructions: req.body.instructions,
      ingredients: ingredients,
      cuisine: req.body.cuisine,
      image: newImageName
    };

    // Find the publication by ID and update its properties
    await Publication.findByIdAndUpdate(publicationId, updatedPublication, { runValidators: true });
    const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

    if (isPostman) {
      res.json({ updatedPublication });
    } else {
      res.redirect(`/publication/${publicationId}`);
    }
    } catch (error) {
    console.error('Error updating publication:', error);
    res.status(500).json({ error: 'Failed to update publication' });
    }
};


exports.deletePublicationById = async (req, res) => {
  try {
    const publicationId = req.params.id;
    console.log(req.session.userId);

    // Find the publication by ID
    const publication = await Publication.findById(publicationId);
    console.log(publication.user.toString());

    // Check if the publication exists
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    // Check if the current user is the author of the publication
    if (publication.user.toString() !== req.session.userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this publication' });
    }

    // User is authorized to delete the publication
    await Publication.findByIdAndDelete(publicationId);
    const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

    if (isPostman) {
      res.status(200).json({ message: 'Publication deleted successfully' });
    } else {
      res.redirect(`/`);
    }
  } catch (error) {
    console.error('Error deleting publication:', error);
    res.status(500).json({ error: 'Failed to delete publication' });
  }
};
