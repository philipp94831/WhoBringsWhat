var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');
var mongoose = require('mongoose');
require('./models/events');
require('./models/event_items');

var routes = require('./routes/index');
var events = require('./routes/events');
var partials = require('./routes/partials');

var app = express();

i18n.configure({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    cookie: 'locale',
    directory: __dirname + '/locales',
    objectNotation: true
});

mongoose.connect('mongodb://localhost/wbw');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/assets/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/events', events);
app.use('/partials', partials);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: err.message,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: err.message,
        message: err.message,
        error: {}
    });
});


module.exports = app;
