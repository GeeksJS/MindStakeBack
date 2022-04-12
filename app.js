var createError = require('http-errors');
var express = require('express');
const request = require('request');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var databaseurl = process.env.DATA_BASE_URL;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/projectRoute');
var complaintRouter = require('./routes/complaintRoute');
var packRouter = require('./routes/packRoute');

var bookmarkRouter = require('./routes/bookmarkRoute');
const Blockchain = require("./blockchain/blockchain")

var featureRouter = require('./routes/featureRoute');

var feedbackRouter = require('./routes/feedbackRoute');

var blockchainRouter = require('./routes/blockchainRoute');



var conversationRoute = require('./routes/conversationRoute');
var messageRoute = require('./routes/messageRoute');

//Database acccess
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mindstake", { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("success connection with DB"));

mongoose.set('useFindAndModify', false);



var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));


app.set('view engine', 'jade');

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/uploads/cv', express.static(path.join('uploads', 'cv')));

app.use('/uploads/video', express.static(path.join('uploads', 'video')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
});




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectRouter);
app.use('/comments', feedbackRouter);
app.use('/complaints', complaintRouter);
app.use('/packs', packRouter);
app.use('/conversations', conversationRoute);
app.use('/messages', messageRoute);
app.use('/bookmarks',bookmarkRouter);
app.use('/features',featureRouter);

app.use('/blockchain',blockchainRouter);



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
    res.status(err.status || 500);
    res.render('error');
});
const blockchain = new Blockchain();
const syncChains = () => {
    request({ url: 'http://localhost:3000/blockchain/blocks' }, (error, response, body) => {
         if (!error && response.statusCode === 200) {
            const rootChain = JSON.parse(body); 
            console.log('replace chain on a sync with', rootChain);
            blockchain.replaceChain(rootChain);
           }
    });
} 

let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = process.env.PORT + Math.ceil( Math.random() * 1000 )
}
const PORT = PEER_PORT || process.env.PORT
app.listen( PORT , () => {

    if( PORT !== PEER_PORT ){
        syncChains()
    }
} )

module.exports = app;