angular.module('todoApp', [])
    .controller('TodoListController', function() {
        var mongoose = require('mongoose');
        var mongoDb = 'mongodb://127.0.0.1/my_databse';
        mongoose.connect(mongoDB, {
            useMongoClient: true
        });

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        var todoList = this;

        //shorthand javascript If statement
        //The “persistent model” = getItem('todos)
        //the model = todoList.todos
        todoList.todos = (localStorage.getItem('todos') !== null) ? JSON.parse(localStorage.getItem('todos')) : [];
        //!== means not equivalent to 


        todoList.remaining = function() {
            var count = 0;
            angular.forEach(todoList.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });

            return count;
        };

        todoList.activeCount = function() {
            var count = 0;
            angular.forEach(todoList.todos, function(todo) {
                if (todo.status == "active") {
                    count++;
                }
            });

            return count;
        };

        todoList.inactiveCount = function() {
            var count = 0;
            angular.forEach(todoList.todos, function(todo) {
                if (todo.status == "inactive") {
                    count++;
                }
            });

            return count;
        };

        todoList.addTodo = function() {
            todoList.todos.push({
                task: todoList.todotask,
                tag: todoList.todotag,
                date: todoList.tododate,
                status: todoList.todostatus,
                done: false
            });

            todoList.todotask = '';
            todoList.todotag = '';
            todoList.tododate = '';

            localStorage.setItem('todos', JSON.stringify(todoList.todos));
        };

        todoList.archive = function() {
            var oldTodos = todoList.todos;

            todoList.todos = [];

            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) todoList.todos.push(todo);
            });

            localStorage.setItem('todos', JSON.stringify(todoList.todos));
        };

        todoList.refresh = function(checked) {
            var tempTodos = JSON.parse(localStorage.getItem('todos'));

            angular.forEach(tempTodos, function(todo) {
                if (angular.equals(checked.todo.text, todo.text)) {
                    todo.done = !todo.done;
                    localStorage.setItem('todos', JSON.stringify(tempTodos));
                }
            });
        };

    });