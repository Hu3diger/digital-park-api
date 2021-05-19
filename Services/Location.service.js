const ResponseModel = require("../Models/ResponseModel");
const dbContext = require("./DbContext.service");

const db = dbContext.getInstance();
const dbLocations = db.collection("locations");

var getAll = async function () {
	return new Promise((resolve) => {
		dbLocations.get().then((querySnapshot) => {
			locations = [];
			querySnapshot.forEach((doc) => {
				data = doc.data();
				locations.push(data);
			});
			resolve(new ResponseModel(200, false, locations));
		});
	});
};

var save = async function (locations, uuid) {
	return new Promise((resolve) => {
		var locationsToSave = [];
		locations.forEach((loc) => {
			var errorMessage = null;
			if (loc.description == null || loc.description == undefined) {
				errorMessage = "Property 'Description' is required";
			} else if (loc.latitude == null || loc.latitude == undefined) {
				errorMessage = "Property 'Latitude' is required";
			} else if (loc.longitude == null || loc.longitude == undefined) {
				errorMessage = "Property 'Longitude' is required";
			}

			if (errorMessage != null) {
				resolve(new ResponseModel(400, true, errorMessage));
				return;
			} else {
				locationsToSave.push(loc);
			}
		});

		var docRef = dbLocations.doc(uuid);
		dbLocations
			.doc(uuid)
			.get()
			.then(async (result) => {
				var objWP = { waypoints: [] };
				if (result.exists) {
					objWP = result.data();
				}

				locationsToSave.forEach((location) => {
					objWP.waypoints.push(location);
				});
				await docRef.set(objWP);

				resolve(new ResponseModel(201, false, "Saved!"));
			});
	});
};

module.exports = {
	getAll: getAll,
	save: save,
};
