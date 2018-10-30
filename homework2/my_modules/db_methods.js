"use_strict";

/**
 *	holds the name of our database which is stored on disk
 */
const DB_NAME = "myDatabase";

/**
 * @author		Oshomah Agbugui <ota2@students.calvin.edu>
 * @version		1.1
 * @since		1.0
 *
 */
var db_methods = function () {
	const jsonDB = require('node-json-db');
	this.db = new jsonDB(DB_NAME, true, false);
};

/**
 * Adds an entry to the database.
 * <p>
 * Adds a specific person as an entry into the database,
 * returning true if they are added successfully.
 * </p>
 *
 * @param  firstname 	first name of the person
 * @param  lastName 	first name of the person
 * @param  loginID 		login ID of the person
 * @param  startDate 	date when this person started working here
 * @return 						true if person added successfully, false otherwise
 */
db_methods.prototype.addEntry = function (firstName, lastName, loginID, startDate) {
	if (this.getEntry(loginID) != null) {
		return false;
	}

	this.db.push("/" + loginID, {
		"firstName" : firstName,
		"lastName" : lastName,
		"startDate" : startDate
	});
	return true;
};

/**
 * Removes a person with given ID from the database.
 * <p>
 * First checks if the entry is present in the database, and
 * if it is, it removes the entry and returns true if successful.
 * </p>
 *
 * @param  loginID 		login ID of the person to be removed
 * @return 				true if person removed successfully, false otherwise
 */
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

/**
 * Gets an entry from the database.
 * <p>
 * Checks to see if the person is in the database, and
 * if they are, returns the person's data in JSON format.
 * Otherwise returns null.
 * </p>
 *
 * @param  loginID 		login ID of the person to be gotten
 * @return 				data of the person if found, null otherwise
 */
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

/**
 * Gets all people from the database.
 * <p>
 * Finds the data of all the people in the database and
 * returns it all in JSON format.
 * </p>
 *
 * @return 				data of all gotten entries
 */
db_methods.prototype.getAll = function () {
	return this.db.getData("/");
};

module.exports = db_methods;
