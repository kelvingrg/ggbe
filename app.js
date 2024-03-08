var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv=require('dotenv')
dotenv.config()
const connectDB =require('./config/dbconfig')
const cors =require('cors')

var authRouter = require('./routes/auth');
var userRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var courtRouter = require('./routes/courts');
var paymentRouter = require('./routes/paymentRouter');
connectDB()
var app = express();

app.use(cors({
  origin:['http://localhost:3000']
})) 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/courts', courtRouter);
app.use('/payment', paymentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(500).json({message:'some thing went wrong'})
});

module.exports = app;
