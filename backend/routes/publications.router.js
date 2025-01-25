const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publications.controller");
const authMiddleware = require('../middlewares/authenticate.middleware');

router.use(authMiddleware.isAuthenticated());

/**
 * Routes 
*/
router.get('/index', publicationController.index);
router.get('/publication/:id', publicationController.explorePublication );
router.delete('/publication/:id', publicationController.deletePublicationById);
router.patch('/publication/:id', publicationController.updatePublication);
router.get('/submit-publication', publicationController.submitPublicationPage);
router.post('/publication', publicationController.submitPublicationOnPost);
router.get('/update-publication/:id', publicationController.updatePublicationPage);
router.post('/publication/:id/comment',publicationController.addComment);
router.get('/search-publication', publicationController.searchPublication);
router.get('/explore-latest', publicationController.exploreLatest);
 
module.exports = router;