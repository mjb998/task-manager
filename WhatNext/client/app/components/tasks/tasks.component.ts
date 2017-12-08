import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent { 
    tasks: Task[];
    title: string;
    description: string;
    dueDate: date;
    tag: string;
    email: string;
    
    
    constructor(private taskService:TaskService){
        this.taskService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
            });
    }
    
    addTask(event){
        var email = document.cookie;

        function getCookie() {
            var name = "email=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        event.preventDefault();
        console.log(getCookie());
        var newTask = {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            status: false,
            tag: this.tag,
            email: getCookie(),
            isDone: false
        }
        
        this.taskService.addTask(newTask)
            .subscribe(task => {
                this.tasks.push(task);
                this.title = '';
                this.description = '';
                this.dueDate = '';
                this.tag = '';
                this.email = '';
            });
    }
    
    deleteTask(id){
        var tasks = this.tasks;
        
        this.taskService.deleteTask(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < tasks.length;i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    }
    
    updateStatus(task){

        var email = document.cookie;

        function getCookie() {
            var name = "email=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        var _task = {
            _id:task._id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            status: !task.status,
            tag: task.tag,
            email: getCookie(),
            isDone: !task.isDone
        };
        
        this.taskService.updateStatus(_task).subscribe(data => {
            task.status = !task.status;
        });
    }
}
