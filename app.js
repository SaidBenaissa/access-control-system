var config = require('./config.json');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var methodOverride = require('method-override');
var User = require('./models/User');
var auth = require('./controllers/auth');
var cards = require('./controllers/cards');
var sockets = require('./controllers/sockets');
var users = require('./controllers/users');
var NfcReader = require('./scripts/NfcReader');
var TCPClient = require('./scripts/TCPClient');

/**
 * App
 */
var app = express();

/**
 * Configuration
 */
var corsOptions = {
    origin: '*'
};

app.use(express.static(__dirname + '/angular/release'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

/**
 * Database configuration
 */
mongoose.connect('mongodb://localhost/access-control-system');

var db = mongoose.connection;
db.on('error', function (e) {
    console.log(chalk.red(e));
    process.exit();
});
db.once('open', function () {
    console.log(chalk.green("DB connection opened"));
});


/**
 * Routes definitions
 */
app.use('/api/auth', auth);
app.use('/api/cards', cards);
app.use('/api/sockets', sockets);
app.use('/api/users', users);

app.get('*', function (req, res) {
    res.sendFile(__dirname + 'angular/release/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

/**
 * Start server
 * @type {http.Server}
 */
var server = app.listen(config.PORT, function () {
    console.log(chalk.green("Server is listening on port " + config.PORT));
});

var io = require('socket.io').listen(server);


/**
 * Start NFC reader
 */
var nfcReader = new NfcReader();
nfcReader.start();

/**
 * Start TCP client
 */
var tcpClient = new TCPClient();
tcpClient.start();

/**
 * Socket.io server
 */
io.on('connection', function (socket) {
    nfcReader.addListener(socket);

    socket.on('disconnect', function () {
        nfcReader.removeListener(socket);
    });
});
