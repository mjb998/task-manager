// Include node modules
var express = require('express');
var app = express()
var request = require('request');
var http = require('http');
var https = require('https');
var router = require('router');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost/taskmanager', {useMongoClient: true})
//  .then(() => console.log('connection successful'))
//  .catch((err) => console.error(err));

// Mongo modules
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/taskmanager';

 MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db.close();
});

// Password encryption
var passwordHash = require('password-hash');
var bcrypt = require('bcrypt');
const saltRounds = 10;

//Body-parser for Express 4.0
//app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: false;
}));

// Proxy this directory at port 8085
app.listen(8085, function(req,res){
    console.log('TaskManager app listening on port 8085!');
});

// Default send out static file in sites directory
app.use(express.static(__dirname + '/sites'));

app.get('/login', function(req,res){
    var email = req.query.email;
    var nonsafe_password = req.query.password;



    password = passwordHash.generate(nonsafe_password);

    console.log("Query data email: " + email + " password: " + password);

    console.log("Quert done. Getting to MongoDB");

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");

//        db.collection("users").find({}).toArray(err, result){
//            console.log(result);
//        }

        db.close();
    });

});

app.post('/signup', function(req,res){

    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var unencrypted_password = req.body.password;

    // Hash password
    bcrypt.hash(unencrypted_password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server.");

            db.collection('users').insertOne({
                firstname: fname,
                lastname: lname,
                email: email,
                password: hash
            });

            db.close();
        });
    });
});

//Nicolle testing
//app.get('/newGet', function(req,res){
//    //console.log("Hello from newMem in index.js");
//    //res.send("<b>Hello</b> there");
//    res.send("hello " + req.query.firstname);
//
//    var firstname = req.query.firstname;
//    var lastname = req.query.lastname;
//    var email = req.query.email;
//    var password = req.query.password;
//
//    MongoClient.connect(url, function(err, db) {
//            assert.equal(null, err);
//            console.log("Connected correctly to server.");
//
//            db.collection('users').insertOne({
//                firstname: firstname,
//                lastname: lastname,
//                email: email,
//                password: password
//            });
//
//            db.close();
//        });
//
//});
//End testing, but keep as a working reference


//Nicolle Testing POST method
app.post('/newPost', function(req,res){
    //console.log("Hello from newMem in index.js");
    //res.send("<b>Hello</b> there");
    //res.send("hello " + req.body.Body);
    res.send("hello " + req.body.firstname);
    
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

//Nicolle testing
app.post("/postme", function(req, res){
    res.end("Firstname is " + req.body.firstname + ", lastname is "+ req.body.lastname);    
});


