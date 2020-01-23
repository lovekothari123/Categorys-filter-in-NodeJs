const express = require("express");
const bodyParser = require("body-parser");
// const hostname = "127.0.0.1";
const hostname = "0.0.0.0";
const port = 3000;
var path = require("path");
// create express app
const app = express();
// parse requests of content-type - application/json
app.use(bodyParser.json());
//Allowed user to access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/app/images/")));
//Import dataBase Config file here
const databaseConfig = require("./config/database.config");
//import mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // Allow mongoose permision
//Connect to mongoosw database using connect
mongoose
  .connect(databaseConfig.url, {
    useNewUrlParser: true
  })
  .then(data => {
    console.log("\nEvent Management Database Connect Sucessfully\n ");
  })
  .catch(err => {
    console.log(
      "\nEvent Management Database can't connect to mongoose \n\n Please wait while \n "
    );
    process.exit();
  });
mongoose.set("debug", true);

//Here we can import all project routes after connecting database.
require("./app/routes/category.routes")(app); // from here app API can work

app.get("/", (req, res) => {
  res.send({
    status: true,
    code: 200,
    data: "Sucessfully deployed"
  });
  console.log("Sucessfully get");
});

// Connect app to hostname and port.
app.listen(port, hostname, () => {
  console.log(`\nServer running at http://${hostname}:${port}/\n\n`);
});
