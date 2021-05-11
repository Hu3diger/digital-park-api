var express = require('express');
const UserService = require("../Services/Users");
var router = express.Router();


router.get('/', function (req, res) {
  res.send('Wiki home page');
})

router.post("/register", async (req, res) => {
	UserService.register(req.body).then((response) => {
		res.status(response.status).send(response);
	});
});

router.post("/auth", async (req, res) => {
	UserService.authenticate(req.body).then((response) => {
		res.status(response.status).send(response);
	});
});

router.get("/:uuid", async (req, res) => {
	UserService.getByUUID(req.params.uuid).then((response) => {
		res.status(response.status).send(response);
	});
});

module.exports = router;
