const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');

const expressValidator = require('express-validator');

const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();

app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(expressValidator());

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//     req.login = promisify(req.login, req);
//     next();
//   });

app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
