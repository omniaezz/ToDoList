import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit{
  
  tasks:string[] = [];
  completed: boolean[] = [];
  newTask:string = "";
  available:boolean=false;
  editMode: boolean = false;
  taskIdToEdit: number | null = null;
  updatedTask: string = "";
  isChecked:boolean = false;

  ngOnInit(): void {
    let taskks = localStorage.getItem('taskks');
    let completedd = localStorage.getItem('completed');
    if (taskks) {
      this.available = true;
      this.tasks = JSON.parse(taskks) as string[];
    }
    if(completedd){
      this.completed = JSON.parse(completedd) as boolean[];
    }
  }

  add(){
    if(this.newTask != ""){
      this.tasks.push(this.newTask);
      this.saveTasksToLocalStorage();
      this.completed.push(false);
      this.saveCompletedToLocalStorage();
      this.newTask = "";
      this.available = true;
    }else{
      alert("please enter your task !!!")
    }
  }

  updateTask(): void {
    if (this.taskIdToEdit !== null) {
      this.tasks[this.taskIdToEdit] = this.updatedTask;
      this.saveTasksToLocalStorage(); 
    }
    this.closePopup();
  }
  
  openEditPopup(taskId: number, task: string): void {
    this.editMode = true;
    this.taskIdToEdit = taskId;
    this.updatedTask = task;
  }
  
  closePopup(): void {
    this.editMode = false;
    this.taskIdToEdit = null;
    this.updatedTask = "";
  }

  saveTasksToLocalStorage(): void {
    localStorage.setItem('taskks', JSON.stringify(this.tasks));
  }

  saveCompletedToLocalStorage():void{
    localStorage.setItem('completed', JSON.stringify(this.completed));
  }

  delete(taskId:number){
    this.tasks.splice(taskId,1);
    this.saveTasksToLocalStorage();
  }

  toggleTaskCompletion(index: number) {
    this.completed[index] = !this.completed[index];
    this.saveCompletedToLocalStorage();
  }

}
