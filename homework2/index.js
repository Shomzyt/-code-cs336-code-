"use_strict";

const express = require('express');
const app = express();
const port = 3000;

const db_methods = require('./my_modules/db_methods.js');
const db = new db_methods();

var bodyParser = require('body-parser');
var path = require('path');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Helper method for calculating years since date
function yearsSinceDate(startDate) {
	let today = new Date();
	let start = new Date(startDate);

	let years = today.getFullYear() - start.getFullYear();

	if (today.getMonth() <= start.getMonth() && today.getDate() < start.getDate()) {
		years--;
	}

	return years;
}

// Show info for all people in the database
app.get('/people', function (req, res) {
	let people = db.getAll();
	if (people != null) {
		res.json(people);
	} else {
		res.sendStatus(500);
	}
});

app.post("/people", function (req, res) {
	let person = db.getEntry(req.body.personId);
	if (person == null) {
		let ret = db.addEntry(req.body.firstName, req.body.lastName, req.body.personId, req.body.startDate);
		if (ret) {
			res.sendStatus(201);
		} else {
			res.sendStatus(403);
		}
	} else {
		res.sendStatus(400);
	}
});

app.route('/person/:personId(\\d+)')
	.get(function (req, res) {
		let person = db.getEntry(req.query.loginID);
		if (person != null) {
			person.years = "" + yearsSinceDate(person.startDate);
			res.json(person);
		} else {
			res.sendStatus(404);
		}
	})
	.put(function (req, res) {
		let ret = db.addEntry(req.body.firstName, req.body.lastName, req.body.personId, req.body.startDate);
		if (ret) {
			res.sendStatus(200);
		} else {
			res.sendStatus(500);
		}
	})
	.delete(function (req, res) {
		let person = db.getEntry(req.params.personId);
		if (person != null) {
			let ret = db.removeEntry(req.params.personId);
			if (ret) {
				res.sendStatus(200);
			} else {
				res.sendStatus(500);
			}
		} else {
			res.sendStatus(400);
		}
	})

// Route to the name of the person with given ID
app.get('/person/:personId(\\d+)/name', function (req, res) {
	let person = db.getEntry(req.body.personId);
	if (person != null) {
		res.json(person.firstName + " " + person.lastName);
	} else {
		res.sendStatus(404);
	}
});

// Route to the number of years of the person with given ID
app.get('/person/:personId(\\d+)/years', function (req, res) {
	let person = db.getEntry(req.params.personId);
	if (person != null) {
		res.json("" + yearsSinceDate(person.startDate));
	} else {
		res.sendStatus(404);
	}
});


// Test methods which exist so that we can interact with our database

app.get('/person/add/:personId(\\d+)-:firstName-:lastName-:startDate', function (req, res) {
	db.addEntry(req.params.firstName, req.params.lastName, req.params.personId, req.params.startDate);
});

app.get('/person/remove/:personId(\\d+)', function (req, res) {
	db.removeEntry(req.params.personId);
});


// Listen to the port
app.listen(app.get('port'), () => console.log('Server started: http://localhost:' + app.get('port') + '/'));
