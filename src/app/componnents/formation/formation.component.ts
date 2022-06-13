import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {IAvailableInstructors, IGetAvailableInstructorsResponse} from "./formation.interface";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
})
export class FormationComponent implements OnInit {
  validateForm!: FormGroup;
  textl: string = 'Add course';
  instructorsAvailable :IAvailableInstructors[]=[];
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const dummyCourse = {
        ...this.validateForm.value,

      }
      const token = localStorage.getItem("ctc_mission_auth_token")

      this.http.post( environment.baseApiUrl+'/courses/',dummyCourse , {headers:{
          "Authorization" : "bearer "+token,
        }}).subscribe(
        responseData=>{console.log(responseData);}
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  AddCourse() {
    console.log('submit', this.validateForm.value);
  }

  constructor(private fb: FormBuilder,private http:HttpClient) {}

  ngOnInit(): void {
    this.http.get<IGetAvailableInstructorsResponse>(environment.baseApiUrl +"/instructor").pipe(map(
      response =>response
    )).subscribe((result)=>{
      console.log(result)
      this.instructorsAvailable = result.data
      console.log(this.instructorsAvailable)

    })
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      address: [null, [Validators.required]],
      price: [null, [Validators.required]],
      capacity: [null, [Validators.required]],
      description : [null, [Validators.required]],
      preview : [null, [Validators.required]],
      mainImage : [null, [Validators.required]],
      placesAvailable : [null, [Validators.required]],
      instructedBy : [null, [Validators.required]],
    });
  }
}
