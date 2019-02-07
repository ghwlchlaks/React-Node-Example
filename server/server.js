const express = require('express');
const path = require('path');
const createError = require('http-errors');
const session = require('express-session');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);
const passport = require('passport');

// routes files
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

// config files
const redis = require('./config/redis');
const mongoose = require('./config/mongoose');
const passportConfig = require('./config/passport');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('mongoose connection!');
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public/')));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'session',
    cookie: { maxAge : 1000 * 60 * 3}, //쿠키 유효시간 3분
    store: new RedisStore({
      client: redis
    })
  }))
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

// if you need api routes add them here
app.use('/',indexRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500).send(err);
  });
  
module.exports = app;