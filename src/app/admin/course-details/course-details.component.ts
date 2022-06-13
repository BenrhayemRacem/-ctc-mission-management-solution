import { Component, OnInit } from '@angular/core';
import {CourseDetailsServiceService} from "./course-details-service.service";
import {map} from "rxjs/operators";
import {ICourseDetails, IEnrollment, IPenalty} from "./courseDetailsInterface";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  providers : [DatePipe]
})
export class CourseDetailsComponent implements OnInit {

  coursesDetails : ICourseDetails ={
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    description:"",
    address:"",
    capacity:"",
    price:"",
    createdAt:"",
    updatedAt:"",
    deletedAt:"",
    mainImage:"",
    preview:"",
    placesAvailable:"",
    "instructedBy": {
      "createdAt": "",
      "deletedAt": "",
      "updatedAt": "",
      "id": "",
      "cv": "",
      "resume" :"",
      "startDate": "",
      "endDate": "",
      professionalImage:"",
      "user": {
        "createdAt": "",
        "deletedAt": "",
        "updatedAt": "",
        "id": "",
        "firstName": "",
        "lastName": "",
        "cin": "",
        "email": "",
        "phoneNumber": "",
        "role": "",
      }
    },
    "plannedBy": {
      "Id": "",
      "userName": ""
    }
  } ;
  courseId : string|null="";
  enrollmentId :string|null = "";
  isDataFetched = false;
   startDateFormat :string|null="";
   endDateFormat :string|null="";
   enrollDetails :IEnrollment = {
     id:"",
     state : "",
     penalization:"",
     extraInformations :  [],
   }
  penaltyMessage: String =""

  constructor( private courseDetailsService:CourseDetailsServiceService,private route:ActivatedRoute,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.enrollmentId = this.route.snapshot.paramMap.get('enrollmentId');
    console.log(this.enrollmentId);
    this.courseDetailsService.getCourseDetails(this.courseId).pipe(map(
      (responseData)=>{
        console.log(responseData)
        return responseData;
      }
    )).subscribe(
      (user)=>{console.log(user);
        this.coursesDetails=user;
        this.isDataFetched=true;
        this.startDateFormat = this.datePipe.transform(this.coursesDetails.startDate)
        this.endDateFormat = this.datePipe.transform(this.coursesDetails.endDate)
        console.log(this.coursesDetails);
      }
    );

    if(this.enrollmentId){
      this.courseDetailsService.getEnrollmentDetails(this.enrollmentId).pipe(map(
        response=>response
      )).subscribe(
        enroll =>this.enrollDetails = enroll,
      )
      this.courseDetailsService.getEnrollPenalty(this.enrollmentId).pipe(map(
        res=>{console.log(res);return res}
      )).subscribe(res=>this.penaltyMessage=res.msg)

    }
  }

  cancelEnrollment(){
    this.courseDetailsService.cancelEnrollment(this.enrollmentId).pipe(map(
      res=>res,
    )).subscribe(res=>console.log(res))
  }

  confirmEnrollment(){
     this.courseDetailsService.confirmEnrollment(this.enrollmentId).pipe(map(
       res=>res,
     )).subscribe(res=>console.log(res))
  }
  getEnrollPenalty(){
 this.courseDetailsService.getEnrollPenalty(this.enrollmentId).pipe(map(
   res=>res
 )).subscribe(res=>this.penaltyMessage=String(res))
  }

}
