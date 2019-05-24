var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
var port = 80;
var router = require('./routes')(app)

var server = app.listen(port, function(){
  console.log("Express server has started on port " + port)
});
*/

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log("Successfully connected to mongod server");
});

mongoose.connect('mongodb://localhost:27017/biseo', {useNewUrlParser: true});

var User = require('./models/user');
var Room = require('./models/room');
var Vote = require('./models/vote');

var port = 80;
var router = require('./routes/')(app, User, Room, Vote)

var server = app.listen(port, () => {
  console.log("Server has started on port " + port);
});
