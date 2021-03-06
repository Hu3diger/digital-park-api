var express = require('express');
const UserService = require("../Services/User.service");
const TokenService = require("../Services/Token.service");
var router = express.Router();

router.get('/', function (req, res) {
	TokenService.validateToken(req.headers.authorization).then((isValid) => {
		if (!isValid){
			res.status(401).send();
		} else {
			UserService.getAll().then((response) => {
				res.status(response.status).send(response);
			});
		}
	});
})

router.post("/register", async (req, res) => {
	TokenService.validateToken(req.headers.authorization).then((isValid) => {
		if (!isValid){
			res.status(401).send();
		} else {
			UserService.register(req.body).then((response) => {
				res.status(response.status).send(response);
			});
		}
	});
});

router.post("/auth", async (req, res) => {
	UserService.authenticate(req.body).then((response) => {
		res.status(response.status).send(response);
	});
});

router.get("/:uuid", async (req, res) => {
	TokenService.validateToken(req.headers.authorization).then((isValid) => {
		if (!isValid){
			res.status(401).send();
		} else {
			UserService.getByUUID(req.params.uuid).then((response) => {
				res.status(response.status).send(response);
			});
		}
	});
});

router.put("/:uuid", async (req, res) => {
	TokenService.validateToken(req.headers.authorization).then((isValid) => {
		if (!isValid){
			res.status(401).send();
		} else {
			UserService.updateUser(req.body, req.params.uuid).then((response) => {
				console.log(response);
				res.status(response.status).send(response);
			});
		}
	});
});

module.exports = router;
