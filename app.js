require("module-alias/register")
require("@config")

const path = require("path");
const express = require("express");
//const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const morganConfig = require("@morganConfig").morgan

const bodyParser = require("body-parser");
const mongoose   = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(cors());
app.use(helmet());
app.use(morgan(morganConfig.stdout.format, morganConfig.stdout.option))
app.use(morgan(morganConfig.stderr.format, morganConfig.stderr.option))

// Mongoose Basic Setting
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log("Successfully connected to mongod server");
});

mongoose.connect("mongodb://localhost:27017/biseo", {useNewUrlParser: true});

// Mongoose Models (User, Room, Vote)
//const User = require('./models/user');
//const Room = require('./models/room');
//const Vote = require('./models/vote');

const router = require("@router")
const auth = require("@authentication")

app.use("/api", router)
app.use("/auth", auth)

const port = process.env.PORT
//const router = require('@router')(app, User, Room, Vote)
//const auth = require('@authentication')(app, User)

const server = app.listen(port, () => {
  console.log("Server has started on port " + port);
});
