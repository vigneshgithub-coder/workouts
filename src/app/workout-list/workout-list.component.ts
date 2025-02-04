import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Interface to define the structure of a workout
export interface Workout {
  username: string;
  workouttype: string;
  workoutminutes: number;
  date: string;
  workout: string;
  duration: number;
}

// Interface to define the structure of grouped workouts
export interface GroupedWorkout {
  username: string;
  workouttypes: string[];
  totalWorkouts: number;
  totalMinutes: number;
}

@Component({
  selector: 'app-workout-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = []; // Array to store all workouts
  filteredWorkouts: GroupedWorkout[] = []; // Array to store filtered workouts
  groupedWorkouts: GroupedWorkout[] = []; // Array to store grouped workouts
  paginatedWorkouts: GroupedWorkout[] = []; // Workouts for the current page
  currentPage: number = 1; // Current page number
  itemsPerPage = new FormControl(5); // Items per page
  totalPages: number = 0; // Total number of pages
  selectedUser: GroupedWorkout | undefined; // Selected user for detailed view

  ngOnInit(): void {
    this.loadWorkouts(); // Load workouts when the component initializes
  }

  // Function to load workouts from local storage
  loadWorkouts(): void {
    try {
      const existingData = localStorage.getItem('workoutData');
      if (existingData) {
        this.workouts = JSON.parse(existingData);
      }
      this.groupWorkouts(); // Group workouts after loading them
      this.updatePagination(); // Update pagination
    } catch (error) {
      console.error('Error loading workouts from local storage:', error);
    }
  }

  // Function to group workouts by username
  groupWorkouts(): void {
    const grouped = this.workouts.reduce((acc, curr) => {
      const user = acc.find((item: GroupedWorkout) => item.username === curr.username);
      if (user) {
        user.workouttypes.push(curr.workouttype);
        user.totalWorkouts += 1;
        user.totalMinutes += curr.workoutminutes;
      } else {
        acc.push({
          username: curr.username,
          workouttypes: [curr.workouttype],
          totalWorkouts: 1,
          totalMinutes: curr.workoutminutes,
        });
      }
      return acc;
    }, [] as GroupedWorkout[]);
    this.groupedWorkouts = grouped;
    this.filteredWorkouts = grouped; // Initialize filteredWorkouts with all data
    this.updatePagination(); // Update pagination
  }

  // Function to update pagination based on the number of items per page
  updatePagination(): void {
    const itemsPerPageValue = this.itemsPerPage.value ?? 5; // Ensure it's never null
    this.totalPages = Math.ceil(this.filteredWorkouts.length / itemsPerPageValue);
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedData(); // Update paginated data
  }

  // Function to update the paginated data based on the current page
  updatePaginatedData(): void {
    const itemsPerPageValue = this.itemsPerPage.value ?? 5;
    const startIndex = (this.currentPage - 1) * itemsPerPageValue;
    const endIndex = startIndex + itemsPerPageValue;
    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
  }

  // Function to navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  // Function to navigate to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  // Form group for searching workouts by username and workout type
  searchWorkOut = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    workouttype: new FormControl<string>('', { nonNullable: true })
  });

  // Function to search workouts by username and workout type
  searchByUserName() {
    const searchdata = this.searchWorkOut.getRawValue();
    console.log("Search data:", searchdata);

    const existingData = localStorage.getItem('workoutData');
    if (existingData) {
      this.workouts = JSON.parse(existingData);
      console.log("Workouts from local storage:", this.workouts);

      this.groupWorkouts(); // Ensure we work with grouped data

      this.filteredWorkouts = this.groupedWorkouts.filter(workout => {
        const usernameMatch = searchdata.username
          ? workout.username.toLowerCase().includes(searchdata.username.toLowerCase())
          : true;
        const workouttypeMatch = searchdata.workouttype
          ? workout.workouttypes.some(type => type.toLowerCase().includes(searchdata.workouttype.toLowerCase()))
          : true;
        return usernameMatch && workouttypeMatch;
      });

      this.updatePagination(); // Update pagination after filtering
      console.log("Filtered Workouts:", this.filteredWorkouts);
    } else {
      console.log("No workouts found in local storage");
    }
  }

  // Function to select a user for detailed view
  selectUser(workout: GroupedWorkout): void {
    this.selectedUser = workout;
  }

  // Form group for adding a new workout
  workoutform = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    workouttype: new FormControl<string>('', { nonNullable: true }),
    workoutminutes: new FormControl<number>(0, { nonNullable: true }),
  });

  // Function to add a new workout
  addworkout() {
    const newWorkoutData = this.workoutform.getRawValue();
    console.log(newWorkoutData);

    try {
      const existingData = localStorage.getItem('workoutData');
      const workouts = existingData ? JSON.parse(existingData) : [];
      workouts.push(newWorkoutData);

      localStorage.setItem('workoutData', JSON.stringify(workouts));
      console.log(localStorage.getItem('workoutData'));
      alert("Workout added successfully");

      this.loadWorkouts(); // Reload workouts after adding a new one
      this.groupWorkouts(); // Regroup workouts
      this.updatePagination(); // Update pagination
    } catch (error) {
      console.error('Error adding workout to local storage:', error);
    }
  }
}

// Ensure to export the component

