var config = require('./config.json');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var User = require('./models/User');
var users = require('./controllers/users');
var auth = require('./controllers/auth');
var cors = require('cors');
var NfcReader = require('./scripts/NfcReader');
var corsOptions = {
    origin: '*'
};

/**
 * Configuration
 */
mongoose.connect('mongodb://localhost/access-control-system');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB connection opened")
});

app.use(express.static(__dirname + '/release'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());


/**
 * Routes definitions
 */
app.use('/api', users);
app.use('/api', auth);

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

app.get('*', function (req, res) {
    res.sendfile('./release/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

/**
 * Start server
 * @type {http.Server}
 */
var server = app.listen(config.PORT, function () {
    console.log("Server is listening on port " + config.PORT);
});

var io = require('socket.io').listen(server);


/**
 * Socket.io server
 */
io.sockets.on('connection', function (socket) {
    socket.emit('message', {message: 'welcome to the chat'});
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

/**
 *
 */
var nfcReader = new NfcReader();
nfcReader.start();