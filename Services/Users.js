const admin = require("firebase-admin");
const serviceAccount = require("../firebase.config.json");
const ResponseModel = require("../Models/ResponseModel");
const UserType = require("../Enums/UserType.enum")
const { uuid } = require("uuidv4");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const dbUsers = db.collection("users");

var register = function (user) {
	return new Promise((resolve) => {
		var response = null;
		if (user.username == null || user.username == undefined) {
			response = new ResponseModel(400, true, "Username property is required");
		} else if (user.password == null || user.password == undefined) {
			response = new ResponseModel(400, true, "Password property is required");
		} else if (user.email == null || user.email == undefined) {
			response = new ResponseModel(400, true, "E-Mail property is required");
		}

		if (response != null) {
			resolve(response);
			return;
		} else {
			var docRef = dbUsers.doc(user.username);
			dbUsers
				.doc(user.username)
				.get()
				.then(async (result) => {
					if (result.exists) {
						resolve(new ResponseModel(400, true, "Username already taken"));
						return;
					}

					user.uuid = uuid();
					if (user.type == null || user.type == undefined){
						user.type = UserType.Type.NORMAL;
					}
					await docRef.set(user);
					resolve(new ResponseModel(201, false, "User created!"));
					return;
				});
		}
	});
};

var authenticate = async function (user) {
	return new Promise((resolve) => {
		var response = null;
		if (user.username == null || user.username == undefined) {
			response = new ResponseModel(400, true, "Username property is required");
		} else if (user.password == null || user.password == undefined) {
			response = new ResponseModel(400, true, "Password property is required");
		}

		if (response != null) {
			resolve(response);
			return;
		} else {
			dbUsers
				.doc(user.username)
				.get()
				.then(async (result) => {
					data = result.data();
					if (result.exists && data.password !== user.password) {
						resolve(new ResponseModel(400, true, "Incorrect password"));
						return;
					} else if (!result.exists) {
						resolve(new ResponseModel(400, true, "User not found"));
						return;
					}

					delete data.password;
					data.token = "DP_WASD_" + Date.now();
					resolve(new ResponseModel(200, false, data));
					return;
				});
		}
	});
};

var getByUUID = async function (uuid) {
	return new Promise((resolve) => {
		var response = null;
		if (uuid == null || uuid == undefined) {
			response = new ResponseModel(400, true, "UUID property is required");
		}

		if (response != null) {
			resolve(response);
			return;
		} else {
			dbUsers.get().then((querySnapshot) => {
				users = [];
				querySnapshot.forEach((doc) => {
					users.push(doc.data());
				});

				responseUser = users.find((user) => user.uuid === uuid);
				if (responseUser) {
					delete responseUser.password;
					response = new ResponseModel(200, false, responseUser);
				}

				if (response == null) {
					response = new ResponseModel(404, true, "User not found");
				}

				resolve(response);
			});
		}
	});
};

var getAll = async function () {
	return new Promise((resolve) => {
		dbUsers.get().then((querySnapshot) => {
			users = [];
			querySnapshot.forEach((doc) => {
				user = doc.data();
				delete user.password;
				users.push(user);
			});
			resolve(new ResponseModel(200, false, users));
		});
	});
};

module.exports = {
	register: register,
	authenticate: authenticate,
	getByUUID: getByUUID,
	getAll: getAll
};
