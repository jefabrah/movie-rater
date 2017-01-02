var express          =  require('express'),
    router           =  express.Router(),
    passport         =  require('passport'),
    adminController  =  require('../controllers/users_admin'),
    logoutController =  require('../controllers/users_logout'),
    regContoller     =  require('../controllers/users_register'),
    loginController  =  require('../controllers/users_login');
                        require('../config/passport');


// Register
router.get('/signup', function(req, res){
  res.render('signup');
});


// Login
router.get('/login', function(req, res){
  res.render('login');
});

// admin console
router.get('/admin', adminController);


// Register User
router.post('/register', regContoller);


// Login User
router.post('/login',
    passport.authenticate('local',
      {successRedirect:'/', failureRedirect:'/users/login'}), loginController);

router.get('/logout', logoutController);


module.exports = router;