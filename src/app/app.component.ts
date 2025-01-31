import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormGroup,FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutListComponent } from './workout-list/workout-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule,WorkoutListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  workoutform=new FormGroup({
    username:new FormControl<string>(''),
    workoutType:new FormControl<string>(''),
    workoutminutes:new FormControl<number>(0)
  });

  addworkout(){
    //getting data from the user through form
    const workoutdata=this.workoutform.getRawValue();
    console.log("captured data:",workoutdata);

    //getting exsisting data from localstorage for adding new workout data
    const existingdata=localStorage.getItem('workoutdata');
    const workouts= existingdata?JSON.parse(existingdata):[];

    //add new data to existing data array
    workouts.push(workoutdata);

    //save the data into localstorage
    localStorage.setItem('workoutdata',JSON.stringify(workouts));

    console.log(localStorage.getItem('workoutdata'));
    alert("workout added successfully");
  }
}
