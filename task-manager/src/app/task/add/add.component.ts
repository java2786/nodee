import { Component, OnInit } from '@angular/core';
import { Task } from './../model/Task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  task: Task = new Task();
  starting_date:any = {};
  ending_date:any = {};

  parents:{_id:string, task:string}[];

  search:any;
  formatter:any;
  selectedParent:{_id:string, task:string} = null;
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.ngBootstrapTypeahead();
    
    // find all the parent ids and tasks
    this.findAllTasks();
    
  }
  
  ngBootstrapTypeahead(){
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
      : this.parents.filter(parent => parent.task.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
    
    this.formatter = (x: {task: string}) => {
      // // console.log(x);
      return x.task;
    };  
    
  }
  
  findAllTasks(){
    this.taskService.getAllTasks()
    .subscribe((res: any)=>{
      // console.log(res);
      if(res.success == true){
        this.parents = res.data;
      } else {
        // console.log("error in finding all tasks");
      }
    })
  }

  changePriority(p){
    // console.log(p);
    this.task.priority = p;
  }

  addTask(){

    this.task.end_date = new Date(`${this.ending_date.year}/${this.ending_date.month}/${this.ending_date.day}`);
    this.task.start_date = new Date(`${this.starting_date.year}/${this.starting_date.month}/${this.starting_date.day}`);

    // console.log(this.task);
    // console.log(this.selectedParent);

    if(!!this.selectedParent){
      this.task.parent_id = this.selectedParent._id;
    }

    this.taskService.createTask(this.task)
    .subscribe((res: any)=>{
      // console.log(res);
      if(res.success == true){
        // console.log('valid')
        this.router.navigate(['/', 'view']);
      } else {
        alert('Invalid user');
      }
    })

  }
}
