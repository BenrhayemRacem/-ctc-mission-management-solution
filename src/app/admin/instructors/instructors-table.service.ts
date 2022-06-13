import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGetResponse} from "../users/usersInterface";
import {IGetInstructorResponse} from "./instructorInterface";

@Injectable({
  providedIn: 'root'
})
export class InstructorsTableService {
  url= environment.baseApiUrl +"/instructor";
  constructor(private http:HttpClient){}
  getInstructors():Observable <IGetInstructorResponse> {
    return this.http.get<IGetInstructorResponse>(this.url);
  }
}
