const admin = require("firebase-admin");
const serviceAccount = require("../firebase.config.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const dbContext = admin.firestore();

var loadInstance = function () {
	return dbContext;
};

module.exports = {
	getInstance: loadInstance,
};
