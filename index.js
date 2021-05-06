const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.config.json");
const ResponseModel = require("./models/ResponseModel");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
const port = 4000;
const BASE_URL = "/api/v1";

app.use(express.json());

app.post(BASE_URL + "/Users/register", async (req, res) => {
	var user = req.body;
	var response = null;
	console.log (user);
	if (user.username == null || user.username == undefined) {
		response = new ResponseModel(400, true, "Username property is required");
	} else if (user.password == null || user.password == undefined) {
		response = new ResponseModel(400, true, "Password property is required");
	} else if (user.email == null || user.email == undefined) {
		response = new ResponseModel(400, true, "E-Mail property is required");
	}

	if (response != null) {
		res.status(response.statusCode).send(response);
		return;
	} else {
		var docRef = db.collection("users").doc(user.username);
		db.collection("users").doc(user.username).get().then(async (result) => {
			console.log(result);
			if (result.exists) {
				response = new ResponseModel(400, true, "Username already taken");
				res.status(response.statusCode).send(response);
				return;
			}

			await docRef.set(req.body);
			res.status(201).send("Created!");
			return;
		})
	}
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}${BASE_URL}`);
});
