import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize workouts correctly', () => {
    component.workouts = [
      { username: 'John', workouttype: 'Cardio', workoutminutes: 30, date: '2025-02-04', workout: 'Running', duration: 30 },
      { username: 'Jane', workouttype: 'Strength', workoutminutes: 45, date: '2025-02-04', workout: 'Weightlifting', duration: 45 },
      { username: 'Mike', workouttype: 'Yoga', workoutminutes: 20, date: '2025-02-04', workout: 'Stretching', duration: 20 },
      { username: 'Alice', workouttype: 'Cycling', workoutminutes: 60, date: '2025-02-04', workout: 'Biking', duration: 60 },
      { username: 'Bob', workouttype: 'Swimming', workoutminutes: 50, date: '2025-02-04', workout: 'Freestyle', duration: 50 },
      { username: 'Sara', workouttype: 'Pilates', workoutminutes: 40, date: '2025-02-04', workout: 'Core Workout', duration: 40 },
      { username: 'Tom', workouttype: 'HIIT', workoutminutes: 35, date: '2025-02-04', workout: 'Interval Training', duration: 35 }
    ];

    expect(component.workouts.length).toBe(7);
  });

  it('should filter workouts by username', () => {
    component.workouts = [
      { username: 'John', workouttype: 'Running', workoutminutes: 30, date: '2025-02-04', workout: 'Running', duration: 30 },
      { username: 'Jane', workouttype: 'Cycling', workoutminutes: 45, date: '2025-02-04', workout: 'Cycling', duration: 45 }
    ];

    component.searchByUserName('John');
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].username).toBe('John');
  });

  it('should paginate workouts correctly', () => {
    component.workouts = [
      { username: 'John', workouttype: 'Running', workoutminutes: 30, date: '2025-02-04', workout: 'Running', duration: 30 },
      { username: 'Jane', workouttype: 'Cycling', workoutminutes: 45, date: '2025-02-04', workout: 'Cycling', duration: 45 },
      { username: 'Mike', workouttype: 'Yoga', workoutminutes: 20, date: '2025-02-04', workout: 'Stretching', duration: 20 },
      { username: 'Alice', workouttype: 'Swimming', workoutminutes: 50, date: '2025-02-04', workout: 'Freestyle', duration: 50 },
      { username: 'Bob', workouttype: 'HIIT', workoutminutes: 35, date: '2025-02-04', workout: 'Interval Training', duration: 35 }
    ];

    component.itemsPerPage = 2;
    component.currentPage = 2;

    component.paginateWorkouts();

    expect(component.paginatedWorkouts.length).toBe(2);
    expect(component.paginatedWorkouts[0]).toEqual(component.workouts[2]); // Page 2 should start with the 3rd workout
  });

  it('should handle invalid page numbers in pagination', () => {
    component.totalPages = 3;
    
    component.changePage(2);
    expect(component.currentPage).toBe(2);

    component.changePage(5); // Invalid page
    expect(component.currentPage).toBe(2); // Should remain on the last valid page
  });

  it('should update pagination correctly when items per page change', () => {
    component.itemsPerPage.setValue(2);
    component.updatePagination();
    expect(component.itemsPerPage.value).toBe(2);
  });
});
