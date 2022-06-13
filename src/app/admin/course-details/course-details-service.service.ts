import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {ICourseDetails, IEnrollment, IPenalty} from "./courseDetailsInterface";

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsServiceService {
url = environment.baseApiUrl + "/courses/"
  enrollmentUrl = environment.baseApiUrl + "/enrollment/"

  constructor(private http:HttpClient ) { }

  getCourseDetails( courseId:string|null){

    return this.http.get<ICourseDetails>(this.url+ courseId);

  }

  getEnrollmentDetails(enrollmentId:string|null) {
  return this.http.get<IEnrollment>(this.enrollmentUrl+enrollmentId);
  }
  confirmEnrollment(enrollmentId:string|null) {
  return this.http.patch(this.enrollmentUrl+"confirm/"+enrollmentId , {})
  }
  cancelEnrollment(enrollmentId:string|null){
    return this.http.post(this.enrollmentUrl+"report/"+enrollmentId , {})

  }
  getEnrollPenalty(enrollmentId:string|null){

 return this.http.get<IPenalty>(this.enrollmentUrl+"penalty/"+enrollmentId)
  }

}
