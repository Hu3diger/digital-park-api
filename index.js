const express = require("express");
const UserController = require('./Controllers/UsersController.js');

const app = express();
const port = 4000;
const BASE_URL = "/api/v1";

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//CONTROLLERS
//Users
app.use(BASE_URL + '/users', UserController);

//Maps is the next one

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}${BASE_URL}`);
});
