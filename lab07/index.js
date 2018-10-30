"use_strict";

const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/hello', function(req, res) {
	res.send({data: "Hello Lab07!"});
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));