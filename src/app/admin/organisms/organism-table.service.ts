import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGetOrganismResponse} from "./organismInterface";

@Injectable({
  providedIn: 'root'
})
export class OrganismTableService {

  url= environment.baseApiUrl +"/organism";
  constructor(private http:HttpClient){}
  getOrganisms():Observable <IGetOrganismResponse> {
    return this.http.get<IGetOrganismResponse>(this.url);
  }
}
