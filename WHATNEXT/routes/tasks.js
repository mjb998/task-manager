var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var cookieParser = require('cookie-parser');
var db = mongojs('mongodb://localhost:27017/taskmanager', ['tasks']);

// var email = document.cookie;

// var myModule = require('./index');

// var email = myModule.globalEmail;

router.use(cookieParser());

// Get All Tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.send(tasks);
    });
});

// Get Single Task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Get Tasks from the user only
router.get('/tasks/email', function(req, res, next){
    // res.cookie('myFirstCookie', 'looks Good');
    db.tasks.find({'email' : req.cookies['email']}, function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//Save Task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.status + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};
    
    if(task.status){
        updTask.status = task.status;
    }
    
    if(task.title){
        updTask.title = task.title;
    }
    if(task.description){
        updTask.description = task.description;
    }
    if(task.dueDate){
        updTask.dueDate = task.dueDate;
    }
    if(task.tag){
        updTask.tag = task.tag;
    }
    if(task.email){
        updTask.email = task.email;
    }
    
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});

module.exports = router;