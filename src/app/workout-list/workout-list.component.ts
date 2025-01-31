import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface workout{
  username:string;
  workoutType:string;
  workoutminutes:number;
}

@Component({
  selector: 'app-workout-list',
  imports: [CommonModule],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})


export class WorkoutListComponent  implements OnInit{

  workouts:workout[]=[];

  ngOnInit(): void {
    this.loadworkouts();
  }

  loadworkouts():void{
    const existingdata=localStorage.getItem('workoutdata');

    if(existingdata){
      this.workouts=JSON.parse(existingdata);
    }


  }


}
