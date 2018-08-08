var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var { PORT } = require('./config');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({error: true});
});

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

module.exports = app;
