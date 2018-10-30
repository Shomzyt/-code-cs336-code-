"use_strict";

const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
app.use(express.static('public'));

let HttpStatus = require('http-status-codes');
=======
app.use(express.static('public/forms'));
>>>>>>> bcbb5a3dd7a95dc1e86c3662c011eceef764be94

let HttpStatus = require('http-status-codes');
app.get('/forms', function (req, res) {
	res.sendFile("lab06.html", {root: './public/forms'});
});
app.post('/my-form-handling-page', function(req, res) {
	res.send(req.body);
});
app.get('/request', function(req, res) {
	res.send("Got a GET request!");
});
app.head('/request', function (req, res) {
	res.send("Got a HEAD request!");
});
app.put('/request', function (req, res) {
	if (req.params != null) {
		res.send(req.body);
	} else {
		res.sendStatus(HttpStatus.BAD_REQUEST);
	}	
});
app.post('/request', function (req, res) {
	if (req.params != null) {
		res.send(req.body);
	} else {
		res.sendStatus(HttpStatus.BAD_REQUEST);
	}
});
app.delete('/request', function (req, res) {
	res.send("Got a DELETE request!");
});

app.all('*', function(req, res) {
	res.sendStatus(HttpStatus.BAD_REQUEST);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));