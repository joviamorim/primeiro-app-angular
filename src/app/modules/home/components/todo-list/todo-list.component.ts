import { Component, DoCheck } from '@angular/core';

// Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck{
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Você deseja apagar todas as tasks?");

    if(confirm){
      this.taskList = [];
    }
  }

  public setEmitTaskList(event: string){
    return this.taskList.push({task: event, checked: false});
  }

  public validationInput(event: string, index: number){

    if(!event.length){
      const confirm = window.confirm("Task está vazia, deseja deletar?");

      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage(){
    this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked));

    localStorage.setItem("list", JSON.stringify(this.taskList));
  }
} 
