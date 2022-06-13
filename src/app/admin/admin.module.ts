import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAdminComponent } from './dashboard/dashboard.component';

import { NgZoroModule } from '../ng-zoro.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TableComponent } from './users/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InstructorsComponent } from './instructors/instructors.component';
import { OrganismsComponent } from './organisms/organisms.component';
import {RouterModule} from "@angular/router";
import {PlanningComponent} from "../componnents/planning/planning.component";
import {CardComponent} from "../shared/card/card.component";
import {FullCalendarModule} from "@fullcalendar/angular";
import {DashboardClientModule} from "../pages/dashboard-client/dashboard-client.module";
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEnrollConfirmationComponent } from './course-enroll-confirmation/course-enroll-confirmation.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {ButtonComponent} from "../shared/button/button.component";
import {PlanningModule} from "../planning/planning.module";





@NgModule({
  declarations: [
    DashboardAdminComponent,
    ButtonComponent,
    TableComponent,
    InstructorsComponent,
    OrganismsComponent,
    //PlanningComponent,
    CardComponent,
    CourseDetailsComponent,
    CourseEnrollConfirmationComponent,



  ],
    exports: [
        ButtonComponent,
       // PlanningComponent
    ],
  imports: [
    CommonModule,
    NgZoroModule,
    NzLayoutModule,
    NzTableModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    DashboardClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PlanningModule


  ]
})
export class AdminModule { }
