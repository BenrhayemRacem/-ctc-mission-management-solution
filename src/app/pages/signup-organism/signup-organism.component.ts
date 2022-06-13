import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-signup-organism',
  templateUrl: './signup-organism.component.html',
  styleUrls: ['./signup-organism.component.scss']
})
export class SignupOrganismComponent implements OnInit {

  validateForm!: FormGroup;
  textl:string="next";
  text2:string="sign up";
  text3:string = "previous";
  isUserSubscription = false ;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const contactPerson = {
        firstName : this.validateForm.value.firstName,
        lastName: this.validateForm.value.lastName,
        email : this.validateForm.value.email,
        phoneNumber : this.validateForm.value.phoneNumber,
        cin : this.validateForm.value.cin,
        password : this.validateForm.value.password,
        repeat_password : this.validateForm.value.cpassword,
        role : "organism-contact"

      }
      const organism = {
        name : this.validateForm.value.name,
        activity : this.validateForm.value.activity,
        nature : this.validateForm.value.nature,
        taxRegistrationNumber : this.validateForm.value.taxRegistrationNumber,
        numberOfEmployees : this.validateForm.value.numberOfEmployees,
        contactPersonPosition : this.validateForm.value.contactPersonPosition,
        subsidiary : this.validateForm.value.subsidiary,
        trainingNeeds : this.validateForm.value.trainingNeeds,
        contactPerson
      }
      console.log(organism)
      this.http.post('http://localhost:3000/auth/organism/signup',organism).subscribe(
        responseData=>{console.log(responseData);}
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
  showUserSubscription(value:boolean):void {
    this.isUserSubscription = value;
    console.log(this.isUserSubscription)
  }

  constructor(private fb: FormBuilder,private http:HttpClient) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      activity: [null, [Validators.required]],
      nature: [null, [Validators.required]],
      taxRegistrationNumber : [null,[Validators.required]],
      contactPersonPosition : [null,[Validators.required]],
      numberOfEmployees : [null],
      subsidiary : [null],
      trainingNeeds : [null],
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
