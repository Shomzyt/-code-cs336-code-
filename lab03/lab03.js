"use_strict";

const express = require('express')
const app = express()
const port = 45454

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello Universe!'));
// app.get('/niccage', (req, res) => res.sendFile("niccage.jpg"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


