import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormationComponent } from './componnents/formation/formation.component';
import { DashboardAdminComponent } from './admin/dashboard/dashboard.component';
import { PlanningComponent } from './componnents/planning/planning.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupOrganismComponent } from './pages/signup-organism/signup-organism.component';
import { SignupUserComponent } from './pages/signup-user/signup-user.component';
import { SignupInstructorComponent } from './pages/signup-instructor/signup-instructor.component';
import { DashboardComponent } from './pages/dashboard-client/dashboard/dashboard.component';
import {CourseDetailsComponent} from "./admin/course-details/course-details.component";
import {CourseEnrollConfirmationComponent} from "./admin/course-enroll-confirmation/course-enroll-confirmation.component";
import {PresSignupComponent} from "./components/pres-signup/pres-signup.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup-user', component: SignupUserComponent },
  { path: 'signup-organism', component: SignupOrganismComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'AddEventForm', component: FormationComponent },
  {path:'adminDashBoard',component:DashboardAdminComponent },
  { path: 'signup-instructor', component: SignupInstructorComponent },
  { path: 'dashboard-client', component: DashboardComponent },
  {path:"course-details/:id" , component:CourseDetailsComponent},
  {path:"course-enroll/:courseId" , component:CourseEnrollConfirmationComponent},
  {path:"enroll-details/:id/:enrollmentId" , component:CourseDetailsComponent},
  {path:"pre-signup" , component:PresSignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
