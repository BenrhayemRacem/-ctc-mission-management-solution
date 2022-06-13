import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import * as moment from "moment";


interface loginResponse {
  role: string,
  token: string,
  expiresIn: string,
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( private http:HttpClient) { }

  login(email:string,password:string) {
    return this.http.post<loginResponse>(environment.baseApiUrl+'/auth/signin', {email, password})
      .subscribe((res)=>this.setSession(res))
      // this is just the HTTP call,
      // we still need to handle the reception of the token
  }

   setSession(authResult:loginResponse) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('ctc_mission_auth_token', authResult.token);
    localStorage.setItem('ctc_mission_auth_role', authResult.role);
    localStorage.setItem("ctc_mission_expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("ctc_mission_expires_at");
    localStorage.removeItem("ctc_mission_auth_token");
    localStorage.removeItem("ctc_mission_auth_role");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("ctc_mission_expires_at");
    const expiresAt = JSON.parse(String(expiration));
    return moment(expiresAt);
  }
}
