require("module-alias/register")
require("@config")

const path = require("path");
const express = require("express");
//const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const morganConfig = require("@morganConfig").morgan
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose   = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(cors());
app.use(helmet());
app.use(morgan(morganConfig.stdout.format, morganConfig.stdout.option))
app.use(morgan(morganConfig.stderr.format, morganConfig.stderr.option))

// mongoose basic setting
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log("Successfully connected to mongod server");
});

mongoose.connect("mongodb://localhost:27017/biseo", {useNewUrlParser: true});

// router setting
const router = require("@router")
const auth = require("@authentication")

app.use("/api", router)
app.use("/auth", auth)


// set port and start server
const port = process.env.PORT

const server = app.listen(port, () => {
  console.log("Server has started on port " + port);
});
