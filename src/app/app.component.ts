import { Component } from '@angular/core';

import {FormGroup, FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkoutListComponent } from './workout-list/workout-list.component'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ ReactiveFormsModule, WorkoutListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected from `styleUrl` to `styleUrls`
})
export class AppComponent {
  title = 'workout';

  workoutform = new FormGroup({
    username: new FormControl<string>(''),
    workoutType: new FormControl<string>(''),
    workoutminutes: new FormControl<number>(0)
  });

  addworkout() {
    // Getting data from the user through form
    const workoutdata = this.workoutform.getRawValue();
    console.log("captured data:", workoutdata);

    // Getting existing data from localstorage for adding new workout data
    const existingdata = localStorage.getItem('workoutdata');
    const workouts = existingdata ? JSON.parse(existingdata) : [];

    // Add new data to existing data array
    workouts.push(workoutdata);

    // Save the data into localstorage
    localStorage.setItem('workoutdata', JSON.stringify(workouts));

    console.log(localStorage.getItem('workoutdata'));
    alert("workout added successfully");
  }
}
