import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormGroup,FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutListComponent } from './workout-list/workout-list.component'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule,WorkoutListComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workout';
  
}
