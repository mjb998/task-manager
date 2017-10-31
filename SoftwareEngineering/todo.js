angular.module('todoApp', [])
	.controller('TodoListController', function() {
        var todoList = this;
        
        //shorthand javascript If statement
        //The “persistent model” = getItem('todos)
        //the model = todoList.todos
            todoList.todos = (localStorage.getItem('todos') !== null) ? JSON.parse(localStorage.getItem('todos')) : [];
        //!== means not equivalent to 

        
        todoList.remaining = function(){
            var count = 0;
            angular.forEach(todoList.todos, function(todo){
                count += todo.done ? 0 : 1; 
            });

            return count;
        };
    
        todoList.activeCount = function(){
            var count = 0;
            angular.forEach(todoList.todos, function(todo){
               if(todo.status == "active"){
                   count++;
               } 
            });
            
            return count;
        };

        todoList.inactiveCount = function(){
            var count = 0;
            angular.forEach(todoList.todos, function(todo){
               if(todo.status == "inactive"){
                   count++;
               } 
            });
            
            return count;
        };
    
        todoList.addTodo = function(){
            todoList.todos.push({stuNum: todoList.todostuNum, 
                                 name: todoList.todoname, add: todoList.todoadd, 
                                 phoneNum: todoList.todophoneNum, 
                                 gpa: todoList.todogpa, 
                                 acPlan: todoList.todoacPlan, 
                                 level: todoList.todolevel, 
                                 status: todoList.todostatus, 
                                 done:false});
            
            todoList.todostuNum = '';
            todoList.todoname = '';
            todoList.todoadd = '';
            todoList.todophoneNum = '';
            todoList.todogpa = '';
            todoList.todoacPlan = '';
            todoList.todolevel = '';
            
            localStorage.setItem('todos', JSON.stringify(todoList.todos));
        };

        todoList.archive = function(){
            var oldTodos = todoList.todos;

            todoList.todos = [];

            angular.forEach(oldTodos, function(todo){
                if( !todo.done ) todoList.todos.push(todo);
            });

            localStorage.setItem('todos', JSON.stringify(todoList.todos));
        };
    
        todoList.refresh = function(checked){
            var tempTodos = JSON.parse(localStorage.getItem('todos'));
            
            angular.forEach(tempTodos, function(todo){
                if(angular.equals(checked.todo.text, todo.text)){
                    todo.done = !todo.done;
                    localStorage.setItem('todos', JSON.stringify(tempTodos));
                } 
            });
        };
    
	});
