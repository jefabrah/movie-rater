var express = require('express');
var session = require("express-session");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var passport = require("passport");
var logger = require('morgan');
var app = express();

app.use(cookieParser());
app.use(logger('combined'));
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

// express session config
app.use(session({
  secret: 'starwars',
  cookie: { maxAge: 60000 * 60 * 24 * 14 },
  saveUninitialized: true,
  resave: true
}));

// passport config
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./routes.js')(app);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("Server running on port %s", PORT);
});


