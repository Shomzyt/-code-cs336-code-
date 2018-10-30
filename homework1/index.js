"use_strict";

const express = require('express');
const app = express();
const port = 45454;

const db_methods = require('./my_modules/db_methods.js');

const db = new db_methods();

// Helper method for calculating years
function yearsSinceDate(startDate) {
	let today = new Date();
	let start = new Date(startDate);

	let years = today.getFullYear() - start.getFullYear();

	if (today.getMonth() <= start.getMonth() && today.getDate() < start.getDate()) {
		years--;
	}

	return years;
}

// Show info for all in database
app.get('/people', function (req, res) {
	let people = db.getAll();
	if (people != null) {
		res.json(people);
	} else {
		res.sendStatus(500);
	}
});

// Route to all info for given person ID
app.get('/person/:personId(\\d+)', function (req, res) {
	let person = db.getEntry(req.params.personId);
	if (person != null) {
		res.json(person);
	} else {
		res.sendStatus(404);
	}
});

// Route to the name of person with given ID
app.get('/person/:personId(\\d+)/name', function (req, res) {
	let person = db.getEntry(req.params.personId);
	if (person != null) {
		res.json(person.firstName + person.lastName);
	} else {
		res.sendStatus(404);
	}
});

// Route to the number of years of person with given ID
app.get('/person/:personId(\\d+)/years', function (req, res) {
	let person = db.getEntry(req.params.personId);
	if (person != null) {
		res.json("" + yearsSinceDate(person.startDate));
	} else {
		res.sendStatus(404);
	}
});


// Test methods which exist so to interact with our database

app.get('/person/add/:personId(\\d+)-:firstName-:lastName-:startDate', function (req, res) {
	db.addEntry(req.params.firstName, req.params.lastName, req.params.personId, req.params.startDate);
});

app.get('/person/remove/:personId(\\d+)', function (req, res) {
	db.removeEntry(req.params.personId);
});


// Listen to port
app.listen(port, () => console.log("App listening on port " + port + "!"));

