WORKING index.js

//This creates an object that has many functions to make writing a web server easier.
var express = require("express");
//This creates our “app” object.
var app = express();
app.listen(8085, function(req, res){
    console.log('Now listening on port 8085!');
});

//Mongo modules
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/taskmanager';

MongoClient.connect(url, function (err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server!");
    db.close();
});

//app.use(express.static("site"));
app.use(express.static(__dirname + '/sites'));
//automatically parse form posts into req.body
app.use(express.urlencoded({extended: false}));

app.post("/postme", function(req, res){
    //res.end("Firstname is " + req.body.firstname + ", lastname is "+ req.body.lastname);
    res.redirect("list.html");
    
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server.");

            db.collection('users').insertOne({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            });

            db.close();
        });
    
});

//doesn't do anything at the moment. Just testing the tail.
app.get('/test', function (req, res) { 
    res.end("hello 5"); 
});