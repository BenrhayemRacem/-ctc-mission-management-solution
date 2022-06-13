import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { IGetCoursesResponse} from "./courseInetrface";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  url = environment.baseApiUrl + "/courses"

  constructor( private http:HttpClient) { }
  getCourses():Observable<IGetCoursesResponse>{
    return this.http.get<IGetCoursesResponse>(this.url)
  }
}
