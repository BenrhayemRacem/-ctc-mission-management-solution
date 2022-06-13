import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IGetResponse, IUsers} from './usersInterface';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersTableService {
  url= environment.baseApiUrl +"/user";
  constructor(private http:HttpClient){}
  getUsers():Observable <IGetResponse> {
    return this.http.get<IGetResponse>(this.url);
  }
}
