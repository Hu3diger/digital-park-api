var express = require('express');
const TokenService = require("../Services/Token.service");
const LocationService = require("../Services/Location.service");
var router = express.Router();

router.get('/', function (req, res) {
	TokenService.validateToken(req.headers.authorization).then((isValid) => {
		if (!isValid){
			res.status(401).send();
		} else {
			LocationService.getAll().then((response) => {
				res.status(response.status).send(response)
			})
		}
	});
})

router.get('/:uuid', function (req, res) {
	TokenService.validateToken(req.headers.authorization).then((isValid) => {
		if (!isValid){
			res.status(401).send();
		} else {
			LocationService.getByUUID(req.params.uuid).then((response) => {
				res.status(response.status).send(response)
			})
		}
	});
})

router.post("/save/:uuid", async (req, res) => {
	TokenService.validateToken(req.headers.authorization).then((isValid) => {
		if (!isValid){
			res.status(401).send();
		} else {
			LocationService.save(req.body, req.params.uuid).then((response) => {
				res.status(response.status).send(response);
			})
		}
	});
});

router.get("/:uuid", async (req, res) => {
	TokenService.validateToken(req.headers.authorization).then((isValid) => {
		if (!isValid){
			res.status(401).send();
		} else {

		}
	});
});

router.put("/:uuid", async (req, res) => {
	TokenService.validateToken(req.headers.authorization).then((isValid) => {
		if (!isValid){
			res.status(401).send();
		} else {

		}
	});
});

module.exports = router;
