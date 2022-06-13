import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from "@angular/router";



interface loginResponse {
  role: string,
  token: string,
  expiresIn: string,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  textl:string="login";

  errorMessage:string ="";

  constructor(private fb: FormBuilder,private http:HttpClient , private authService:AuthService , private route:Router) {}

   submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const user = {
        email:this.validateForm.value.userName,
        password:this.validateForm.value.password
      }

      this.http.post<loginResponse>(environment.baseApiUrl+'/auth/signin',user).subscribe(
        responseData=>{
          this.authService.setSession(responseData);
          if(responseData.role==="admin") {
            console.log(responseData.role==="admin")
             this.route.navigate(['/adminDashBoard'])
          } else {
            this.route.navigate(['/dashboard-client'])

          }

          },
        error => this.errorMessage =  Array.isArray(error.error.message) ? error.error.message[0]:error.error.message
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      const role = localStorage.getItem("ctc_mission_auth_role")

      if(role && role==="admin") {
        this.route.navigate(["/adminDashboard"])
      } else {
        this.route.navigate(["/dashboard-client"])
      }

    }
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
