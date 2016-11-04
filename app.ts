import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';
import * as passport from 'passport';
import * as crypto from 'crypto';

/** TaskList model */
import TaskList from './models/tasklist';
/** User authentication model */
import User from './models/user';
/** Bring in the passport configuration */
require('./config/passport');
/** This imports the routes for the index.ejs */
import routes from './routes/index';
/** Routes for user task lists */
import taskRoute from './routes/task';




let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));

/** Initialize the passport service */
app.use(passport.initialize());
/** Routes for user authentication */
import users from './routes/users';



app.use('/', routes);
app.use('/user', users);
app.use('/tasks', taskRoute);


//SEED THE DATABASE WITH SOME DATA
mongoose.connect('mongodb://crufener:jenniferr1@ds023624.mlab.com:23624/taskapp').then(() => {
  //drop database and create new document
  mongoose.connection.db.dropDatabase(() => {
    let tasklist1 = new TaskList();
    let tasklist2 = new TaskList();
    let tasklist3 = new TaskList();
    tasklist1.name = 'First List';
    tasklist1.isLoginedIn = true;
    tasklist2.name = 'Second List';
    tasklist2.isLoginedIn = true;
    tasklist3.name = 'Third List';
    tasklist3.isLoginedIn = true;
    tasklist1.tasks.push(
      {name: 'thing one', done: false},
      {name: 'thing two', done: false},
      {name: 'thing three',done: true},
      {name: 'thing four', done: true},
    );
    tasklist2.tasks.push(
      {name: 'thing one', done: false},
      {name: 'thing two', done: false},
      {name: 'thing three', done: true},
      {name: 'thing four', done: true},
    );
    tasklist3.tasks.push(
      {name: 'thing one', done: false},
      {name: 'thing two', done: false},
      {name: 'thing three', done: true},
      {name: 'thing four', done: true},
    );
    tasklist1.save();
    tasklist2.save();
    tasklist3.save();
  });
});

// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
