var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors =  require('cors');

var { PORT, DATABASE_URL } = require('./config');
var usersRouter = require('./routes/users');

var app = express();

mongoose.Promise = global.Promise;

//Connect to mongodb
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connection to database successful!`);
  })
  .catch(err => console.log(`Error connecting to database: ${err}`));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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
