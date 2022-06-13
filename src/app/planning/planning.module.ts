import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanningComponent} from "../componnents/planning/planning.component";
import {EnrolledCoursesComponent} from "../componnents/enrolled-courses/enrolled-courses.component";
import {FullCalendarModule} from "@fullcalendar/angular";



@NgModule({
  declarations: [
    PlanningComponent,
    EnrolledCoursesComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,

  ],
  exports:[
    PlanningComponent,
    EnrolledCoursesComponent
  ]
})
export class PlanningModule { }
