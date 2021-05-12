const admin = require("firebase-admin");
const serviceAccount = require("../firebase.config.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const dbTokens = db.collection("auth_tokens");

var generate = function () {
	let token = Math.random().toString(36).substring(16);
	var dataExpiration = new Date();

	var expiration = {
		expiration: dataExpiration.setHours(dataExpiration.getHours() + 4),
	};

	return new Promise((resolve) => {
		var docRef = dbTokens.doc(token);
		await docRef.set(expiration);
		resolve(token);
		return;
	});
};

module.exports = {
	generate: generate,
};
