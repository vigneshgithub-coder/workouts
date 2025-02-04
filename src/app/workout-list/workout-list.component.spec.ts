import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ✅ Use 'imports' instead of 'declarations' since it's a standalone component
      imports: [WorkoutListComponent, ReactiveFormsModule, CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load workouts from local storage', () => {
    const mockWorkouts = [
      { username: 'John', workouttype: 'Running', workoutminutes: 30, date: '2025-02-04', workout: 'Morning run', duration: 30 }
    ];
    localStorage.setItem('workoutData', JSON.stringify(mockWorkouts));

    component.loadWorkouts();

    expect(component.workouts.length).toBe(1);
    expect(component.workouts[0].username).toBe('John');
  });

  it('should group workouts correctly', () => {
    component.workouts = [
      { username: 'Alice', workouttype: 'Yoga', workoutminutes: 20, date: '2025-02-04', workout: 'Morning Yoga', duration: 20 },
      { username: 'Alice', workouttype: 'Cardio', workoutminutes: 40, date: '2025-02-04', workout: 'Evening Cardio', duration: 40 }
    ];
    
    component.groupWorkouts();
    
    expect(component.groupedWorkouts.length).toBe(1);
    expect(component.groupedWorkouts[0].totalWorkouts).toBe(2);
    expect(component.groupedWorkouts[0].totalMinutes).toBe(60);
  });

  it('should update pagination correctly', () => {
    component.filteredWorkouts = Array(12).fill({
      username: 'User1',
      workouttypes: ['Yoga'],
      totalWorkouts: 1,
      totalMinutes: 30
    });
    
    component.itemsPerPage.setValue(5);
    component.updatePagination();
    
    expect(component.totalPages).toBe(3);
    expect(component.paginatedWorkouts.length).toBe(5);
  });

  it('should navigate to next and previous page', () => {
    component.filteredWorkouts = Array(10).fill({
      username: 'User1',
      workouttypes: ['Yoga'],
      totalWorkouts: 1,
      totalMinutes: 30
    });
    
    component.itemsPerPage.setValue(5);
    component.updatePagination();

    expect(component.currentPage).toBe(1);
    component.nextPage();
    expect(component.currentPage).toBe(2);
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should filter workouts correctly when searching', () => {
    component.workouts = [
      { username: 'Alice', workouttype: 'Yoga', workoutminutes: 20, date: '2025-02-04', workout: 'Morning Yoga', duration: 20 },
      { username: 'Bob', workouttype: 'Running', workoutminutes: 30, date: '2025-02-04', workout: 'Evening Run', duration: 30 }
    ];
    component.groupWorkouts();

    component.searchWorkOut.setValue({ username: 'Alice', workouttype: '' });
    component.searchByUserName();
    
    expect(component.filteredWorkouts.length).toBe(0);
    expect(component.filteredWorkouts[0].username).toBe('Alice');
  });

  it('should add a new workout', () => {
    spyOn(window, 'alert');
    component.workoutform.setValue({ username: 'Charlie', workouttype: 'Swimming', workoutminutes: 45 });

    component.addworkout();

    const storedData = JSON.parse(localStorage.getItem('workoutData') || '[]');
    expect(storedData.length).toBeGreaterThan(0);
    expect(storedData[0].username).toBe('Charlie');
    expect(window.alert).toHaveBeenCalledWith('Workout added successfully');
  });
});
