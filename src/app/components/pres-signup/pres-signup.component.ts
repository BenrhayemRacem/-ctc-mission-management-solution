import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pres-signup',
  templateUrl: './pres-signup.component.html',
  styleUrls: ['./pres-signup.component.scss']
})
export class PresSignupComponent implements OnInit {

  validateForm!: FormGroup;
  textl:string="next";
  successMessage=false;
  errorMessage!:string[];
  constructor(private fb: FormBuilder, private router :Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      status: [null, [Validators.required]],

    });
  }
  submitForm() {
    if (this.validateForm.valid) {
      const value = this.validateForm.value.status;
      if(value==="individual") {
        this.router.navigate(["/signup-user"])
      }else if(value==="organism"){
        this.router.navigate(["/signup-organism"])
      }else {
        this.router.navigate(["/signup-instructor"])
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });

    }
  }

}
