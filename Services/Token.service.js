const dbContext = require("./DbContext.service");
const crypto = require("crypto");

const db = dbContext.getInstance();
const dbTokens = db.collection("auth_tokens");

var generate = async function () {
	var token = crypto
		.createHash("sha1")
		.update(new Date().valueOf().toString() + Math.random().toString())
		.digest("hex");

	var dataExpiration = new Date();

	var expiration = {
		expiration: dataExpiration.setHours(dataExpiration.getHours() + 4),
	};

	var docRef = dbTokens.doc(token);
	await docRef.set(expiration);
	return token;
};

var validateToken = async function (token) {
	var tokenWithoutBearer = (token.toString()).substring(7, token.length);
	return dbTokens
		.doc(tokenWithoutBearer)
		.get()
		.then((result) => {
			console.log(result.exists);
			if (result.exists) {
				const obj = result.data();
				const expirtationDate = new Date(obj.expiration);
				const now = new Date();
				if (now.getTime() > expirtationDate.getTime()) {
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}
		});
};

module.exports = {
	generate: generate,
	validateToken: validateToken,
};
