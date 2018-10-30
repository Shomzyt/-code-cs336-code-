"use_strict";

const DB_NAME = "myDatabase";

var db_methods = function () {
	const jsonDB = require('node-json-db');
	this.db = new jsonDB(DB_NAME, true, false);
};

db_methods.prototype.addEntry = function (firstName, lastName, loginID, startDate) {
	this.db.push("/" + loginID, {
		"firstName" : firstName,
		"lastName" : lastName,
		"startDate" : startDate
	});
	return true;
};

db_methods.prototype.removeEntry = function(loginID) {
	// Check to see if the data exists
	if (getEntry(loginID) != null) {
		// Delete the data if so
		this.db.delete("/" + loginID);
		return true;
	} else {
		return false;
	}	
};

db_methods.prototype.getEntry = function(loginID) {
	let exists = true;
	let data = null;

	// Attempt to read the data from the database
	try {
		let data = this.db.getData("/" + loginID);
		if (data.firstName == null || data.lastName == null || data.startDate == null) {
			return null;
		} else {
			return data;
		}
	} catch(error) {
		return null;
	}
};

db_methods.prototype.getAll = function () {
	return this.db.getData("/");
};

module.exports = db_methods;