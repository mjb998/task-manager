//This creates an object that has many functions to make writing a web server easier.
var express = require("express");
//This creates our “app” object.

// THIS IS JEREMY'S SWAG MONEY NATION EXTRAVAGANZA AMAZING STUFF!!!!
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var test = require('./routes/test');
var tasks = require('./routes/tasks');

// Austin's additions
var http = require('http');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var app = express();

// more of jeremy's swag stuff
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

app.listen(8085, function(req, res) {
    console.log('Now listening on port 8085!');
});

//Mongo modules
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/taskmanager';
var globalEmail = "";

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server!");
    db.close();
});

//app.use(express.static("site"));
app.use(express.static(__dirname + '/sites'));

//automatically parse form posts into req.body
app.use(express.urlencoded({ extended: false }));

app.use('/test', test);
app.use('/api', tasks);

app.use('/todo', express.static(__dirname + '/sites/list.html'));

app.use('/congrats', express.static(__dirname + '/sites/account_created.html'));

app.get('/get_todo', function(req, res) {

    var email = req.query.email;

    console.log(email)

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");

        //        db.collection('tasks').find({email:email}, function(errr,doc){
        //            
        //            console.log(doc);
        //            //res.send(doc);
        //        })

        db.collection("tasks").find({ email: email }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
            db.close();
        });
    });

})

//Nicolle's stuff
app.post('/post_signup', function(req, res) {
    //res.end("Firstname is " + req.body.firstname + ", lastname is "+ req.body.lastname);

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    globalEmail = req.body.email;
    exports.globalEmail = globalEmail;
    var password = req.body.password;

    console.log('Requested... /post_signup');
    console.log(firstname + " " + lastname + " " + email + " " + password);

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");

        var what = db.collection('users').insertOne({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        });
        res.send({ res: what, notify: "account created" });
        db.close();
    });

    // BELOW CHECK THAT EMAIL ALREEADY EXISTED OR NOT BUT ITS NOT WORKING.
    // NEED TO ADD ASYNC TO THE FUNCTION FOR FIRST FUNCTION TO FINISH FIRST AND THEN SECOND THEN WE CAN CLOSE THE DATABASE CONNECTION

    //    MongoClient.connect(url, function(err, db) {
    //        assert.equal(null, err);
    //        console.log("Connected correctly to server.");
    //        
    //        db.collection('users').findOne({email:email},function(errr, doc){
    //            console.log(doc);
    //            if(doc == null){
    //                console.log("Inserting " + email + " into MongoDB");
    //                db.collection('users').insertOne({
    //                    firstname: firstname,
    //                    lastname: lastname,
    //                    email: email,
    //                    password: password
    //                });
    //                //res.redirect('/todo');
    //                res.send({existed:false, res: doc, notify: "account created"});
    //            } else {
    //                //res.redirect('/login');
    //                console.log("Account already existed");
    //                res.send({existed:true, res: doc, notify: "account existed"});
    //            }
    //            db.close();
    //        });
    //        db.close();
    //    });
});

//Nicolle's stuff
app.post('/post_login', function(req, res) {

    var email = req.body.email;
    globalEmail = req.body.email;
    exports.globalEmail = globalEmail;
    var password = req.body.password;

    console.log('Requested... /post_login');
    console.log(email + " " + password);

    MongoClient.connect(url, function(err, db) {

        assert.equal(null, err);
        console.log("Connected correctly to server.");

        db.collection('users').findOne({ email: email }, function(errr, doc) {
            console.log(doc);
            console.log(doc.email);

            if (email == doc.email) {
                document.cookie = "email=test";
                // resp.cookie('myFirstCookie', 'looks good');
                console.log("email existed");
                if (password == doc.email) {
                    res.send({ verified: true, res: doc, notify: "username and password corrected" });
                } else {
                    res.send({ verified: false, res: doc, notify: "username existed but wrong password" });
                }
                //res.send({verified: true, res: doc});    
            } else {
                res.send({ verified: false, res: doc, notify: "username doesn't exist" });
            }
        });
    });
})

// Add_user from Austin
app.post('/api/add_user',
    function(req, res, next) {
        console.log("add_user");
        MongoClient.connect(url, function(err, db) {
            if (err) { console.log(err); } else {
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    console.log(hash);
                    req.body.password = hash;
                    var obj = req.body;
                    db.collection("users").insertOne(obj, function(err, res) {
                        if (err) { console.log(err); } else {
                            console.log('inserted user');
                        }
                    });
                });
            }
        });
    });

// get_user from Austin
app.post('/api/get_user', function(req, res, next) {
    console.log("made it to get user");
    MongoClient.connect(url, function(err, db) {
        if (err) { console.log(err); }
        db.collection("users").find({ 'email': req.body.email }).count(function(err, result) {
            console.log(req.body.email);
            console.log(result);
            res.json({ count: result });
            db.close();
        });
    });
});

// check_login from Austin
app.post('/api/check_login', function(req, res, next) {
    console.log("in login")
    MongoClient.connect(url, function(err, db) {
        if (err) { console.log(err) }
        db.collection("users").find({ 'email': req.body.email }).toArray(function(err, result) {
            //console.log(result[0]);
            console.log(result[0].password);
            console.log(req.body.password);
            bcrypt.compare(req.body.password, result[0].password).then(function(result) {
                console.log(result);
                var authenticated = result == true ? { authenticated: true } : { authenticated: false };
                console.log(authenticated);
                res.send(authenticated);
                db.close();
            });
        });
    });
});

//Nicolle's stuff! doesn't do anything at the moment. Just testing the tail.
app.get('/login', function(req, res) {
    res.send("You have an account! Try login.");
});