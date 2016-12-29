var express      = require('express'),
    session          = require("express-session"),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override'),
    cookieParser     = require('cookie-parser'),
    passport         = require("passport"),
    logger           = require('morgan'),
    expressValidator = require('express-validator'),
    flash            = require('connect-flash'),
    app              = express();
    global.db        = require('./models');



app.use(cookieParser());
app.use(logger('dev'));
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// passport config
app.use(passport.initialize());
app.use(passport.session());

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes

var routes = require('./routes/index');
app.use('/', routes);
var users = require('./routes/users');
app.use('/users', users);

var PORT = process.env.PORT || 3000;

db.sequelize.sync({
  force: true // Make false for data protection & in production
}).then(function() {
  app.listen(PORT, function() {
    console.log("Server running on port %s", PORT);
  });
});