import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.scss']
})
export class SignupUserComponent implements OnInit {
  validateForm!: FormGroup;
  textl:string="signup";
  successMessage=false;
  errorMessage!:string[];
  constructor(private fb: FormBuilder,private http:HttpClient) {}


  submitForm(): void {
    if (this.validateForm.valid) {
      const {firstName,lastName,email,phoneNumber,cin,password,cpassword} = this.validateForm.value
      const user = {
      firstName,lastName,email,phoneNumber,cin,password,repeat_password:cpassword
      }
      console.log('submit', this.validateForm.value);
      this.http.post('http://localhost:3000/auth/signup',user).subscribe(
        responseData=>{
          console.log(responseData);
          this.successMessage=true;
        },
        error=>{
          console.log(error);
          this.errorMessage=error.error.message;
          console.log(this.errorMessage);}
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
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      cin: [null, [Validators.required]],
      password: [null, [Validators.required]],
      cpassword: [null, [Validators.required]],
    });
  }

}
