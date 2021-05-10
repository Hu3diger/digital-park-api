const express = require("express");
const UserService = require("./Services/Users");
var cors = require('cors')

const app = express();
const port = 4000;
const BASE_URL = "/api/v1";

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post(BASE_URL + "/Users/register", async (req, res) => {
	UserService.register(req.body).then((response) => {
		res.status(response.status).send(response);
	});
});

app.post(BASE_URL + "/Users/auth", async (req, res) => {
	UserService.authenticate(req.body).then((response) => {
		res.status(response.status).send(response);
	});
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}${BASE_URL}`);
});
