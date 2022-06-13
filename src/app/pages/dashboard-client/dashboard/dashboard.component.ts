import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../login/auth.service";
import {Router} from "@angular/router";
import {ProfileUpdateInterface} from "../../profile-update/profile-update.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isEnrolledCoursesViewContext: boolean;
  isProfileViewContext: boolean;
  isPlanningViewContext: boolean;
  successMessage=false;
  errorMessage!:string[];
  index=0;
  authUser:ProfileUpdateInterface = {
    firstName:"",
    lastName:"",
    email:"",
    cin:"",
    phoneNumber:"",
    role:"",
    profileImage:"",
    id:"",
    instructor: {
      professionalImage:"",
      resume:"",
      cv:"",
      startDate:"",
      endDate:"",
      courses:[],
    },
    enrolled:[]

  }


  constructor( private authService:AuthService , private router:Router , private http:HttpClient) {
    this.isEnrolledCoursesViewContext = true;
    this.isPlanningViewContext=false;
    this.isProfileViewContext=false;
   }

  ngOnInit(): void {
    if(this.authService.isLoggedOut()) {
      this.router.navigate(["/login"])
    }
    const token = localStorage.getItem("ctc_mission_auth_token")
    this.http.get<ProfileUpdateInterface>('http://localhost:3000/user/one',{headers:{
        "Authorization" : "bearer "+token
      }}).subscribe(
      responseData => {
        console.log(responseData);
        this.successMessage = true;

        this.authUser = responseData

      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
      }
    );

  }
  swapView(i:number) {
    this.index=i;
  }
  swapViewToPlanningPage() {
    this.isEnrolledCoursesViewContext = false;
    this.isPlanningViewContext=true;
    this.isProfileViewContext=false;
  }
  swapViewToEnrolledCoursesPage() {
    this.isEnrolledCoursesViewContext = true;
    this.isPlanningViewContext=false;
    this.isProfileViewContext=false;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"])
  }

}
