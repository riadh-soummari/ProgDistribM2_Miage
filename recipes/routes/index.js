var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/authenticate.middleware');

/* GET home page. */
router.get("/", authMiddleware.isAuthenticated("/"), (req, res)=>{
    res.redirect("/index");
});

//Get Register page 
router.get("/register", authMiddleware.isAuthenticated("register"), (req, res)=>{
    res.redirect("/index");
});

//Get Login page 
router.get("/login", authMiddleware.isAuthenticated("login"), (req, res)=>{
  res.redirect("/index");
});

module.exports = router;
