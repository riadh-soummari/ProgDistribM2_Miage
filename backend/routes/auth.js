const router = require("express").Router();
const passport = require("passport");


const User = require("../models/users");


//Use passport-local configuration Create passport local Strategy
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

//Local route Register new user
router.post("/auth/register", async (req, res)=>{
  try{
    //Register User 
    const registerUser = await User.register({username: req.body.username}, req.body.password);
    if(registerUser){
      // if user registered, we will authenticate the user using passport
      passport.authenticate("local")(req,res,function(){
        req.session.userId = req.user.id;
        res.redirect("/"); 
      });
    }else{
      res.redirect("/register");
    }
  }catch(err){
    console.log(err)
    res.send("Error: " + err.message);
  }
});

//Local route Login user
router.post("/auth/login", (req, res)=>{
  //create new user
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  //use passport login method to check if user credentials true and  authenticate it
  req.login(user, (err)=>{
    if(err){
      console.log(err);
    }else{
      passport.authenticate("local")(req, res, ()=>{
        req.session.userId = req.user.id;
        res.redirect("/")
      });
    }
  });
});


//Logout user
router.get("/auth/logout", (req, res) => {
  // Use passport logout method to end user session and unauthenticate it
  req.logout(function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error logging out");
    }
    // Redirect to the homepage after successful logout
    res.redirect("/");
  });
});


module.exports = router;