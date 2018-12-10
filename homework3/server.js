/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var MongoClient = require('mongodb').MongoClient

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds227674.mlab.com:27674/cs336', function (err, client) {
    if (err) throw err;

    var db = client;

    // Additional middleware which will set headers that we need on each request.
    app.use(function(req, res, next) {
        // Set permissive CORS header - this allows this server to be used only as
        // an API server in conjunction with something like webpack-dev-server.
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Disable caching so we'll always get the latest comments.
        res.setHeader('Cache-Control', 'no-cache');
        next();
    });

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
        var collection = db.collection('homework3');

        collection.find({}).toArray(function(err, docs) {
            for (let i = 0; i < docs.length; i++) {
                docs[i].years = "" + yearsSinceDate(docs[i].startDate);
            }
            res.json(docs);
        });
    });

    app.post("/people", function (req, res) {
        var collection = db.collection('homework3');

        var person = {
            id: Date.now(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            startDate: req.body.startDate
        }

        collection.insertOne(person, function(err, result) {
            if (err) throw err;
        });
    });

    app.route('/person/:personId(\\d+)')
        .get(function (req, res) {
            var collection = db.collection('homework3');

            let result = collection.find( {id : req.query.loginID} );
            if (result) {
                result.years = "" + yearsSinceDate(result.startDate);
                res.json(result);
            }
            
            res.sendStatus(404);
        })
        .put(function (req, res) {
            var collection = db.collection('homework3');

            var person = {
                id: req.body.personId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                startDate: req.body.startDate
            }

            collection.replaceOne({id: person.id}, person, function(err, result) {
                if (err) throw err;
            });
        })
        .delete(function (req, res) {
            var collection = db.collection('homework3');

            collection.deleteOne({id: req.params.personId}, function(err, result) {
                if (err) throw err;
            });
        })

    // Route to the name of the person with given ID
    app.get('/person/:personId(\\d+)/name', function (req, res) {
        var collection = db.collection('homework3');

        collection.find({id: req.body.personId}, function (err, result) {
            if (err) throw err;
            res.json(result.firstName + " " + person.lastName);
        })
    });

    // Route to the number of years of the person with given ID
    app.get('/person/:personId(\\d+)/years', function (req, res) {
        var collection = db.collection('homework3');

        collection.find({id: req.body.personId}, function (err, result) {
            if (err) throw err;
            res.json("" + yearsSinceDate(person.startDate));
        })
    });

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
})


