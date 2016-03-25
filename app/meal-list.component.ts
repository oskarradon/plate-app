import { Component, EventEmitter } from 'angular2/core';
import { MealComponent } from './meal.component';
import { Meal } from './meal.model';
import { EditMealDetailsComponent } from './edit-meal-details.component';
import { NewMealComponent } from './new-meal.component';
import { CaloriePipe } from './calorie.pipe';

@Component({
  selector: 'meal-list',
  inputs: ['mealList'],
  outputs: ['onMealSelect'],
  pipes: [CaloriePipe],
  directives: [MealComponent, EditMealDetailsComponent, NewMealComponent],
  template: `
    <select (change)="onChange($event.target.value)" class="filter">
      <option value="all">All Inventory</option>
      <option value="unhealthy">Foods with more than 300 calories</option>
      <option value="healthy">Foods with less than 300 calories</option>
    </select>

    <meal-display *ngFor="#currentMeal of mealList | calories:filterCalories"
    (click)="mealClicked(currentMeal)"
    [meal]="currentMeal">
    </meal-display>

    <edit-meal-details *ngIf="selectedMeal" [meal]="selectedMeal"></edit-meal-details>

    <new-meal (onSubmitNewMeal)="createMeal($event)"></new-meal>
  `
})
export class MealListComponent {
  public mealList: Meal[];
  public onMealSelect: EventEmitter<Meal>;
  public selectedMeal: Meal;
  public filterCalories: string = "all";
  constructor() {
    this.onMealSelect = new EventEmitter();
  }
  mealClicked(clickedMeal: Meal): void {
    this.selectedMeal = clickedMeal;
    this.onMealSelect.emit(clickedMeal);
  }
  createMeal(newMeal: Meal): void {
    this.mealList.push(newMeal);
  }
  onChange(filterOption) {
    this.filterCalories = filterOption;
  }
}
