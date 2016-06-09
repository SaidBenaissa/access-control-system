var config = require('./config.json');
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var router = express.Router();
var User = require('./models/User');

var server = app.listen(config.PORT, function () {
    console.log("Server is listening on port " + config.PORT);
});

var io = require('socket.io').listen(server);

// configuration =================

mongoose.connect('mongodb://localhost/access-control-system');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB connection opened")
});


app.use(express.static(__dirname + '/release'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('/test', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

app.get('/test1', function (req, res) {
    var u = new User({
        name: 'fgonlkdf',
        password: 'fffff',
        admin: false,
        mail: 'teeee'
    });
    u.save(function () {
        res.json(u);
    });

});

app.use('/api', router);

app.get('*', function (req, res) {
    res.sendfile('./release/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', {message: 'welcome to the chat'});
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});