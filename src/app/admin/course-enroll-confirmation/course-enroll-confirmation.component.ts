import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-course-enroll-confirmation',
  templateUrl: './course-enroll-confirmation.component.html',
  styleUrls: ['./course-enroll-confirmation.component.scss']
})
export class CourseEnrollConfirmationComponent implements OnInit {
  validateForm!: FormGroup;
  validateFormNumber!: FormGroup;
  size=1;
  textl:string="submit enrollment";
  text2="ADD"
  successMessage=false;
  showNext=false
  showContainer=false
  errorMessage=false;
  courseId : string|null = ""
  listOfControl: Array<{ id: number; controlInstance: string ; controlEmail:string }> = [];

  constructor(private fb: FormBuilder, private http:HttpClient,private route:ActivatedRoute ,private router:Router) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.validateFormNumber = this.fb.group({
      number: [null, [Validators.required]],

    })

    this.validateForm = this.fb.group({});
    this.addField();
  }


  changeShowContainer(b:boolean) {
    this.showContainer=b;
  }
  changeShowNext(b:boolean) {
    this.showNext=b;
    this.text2 = b? "CANCEL" : "ADD";
  }

  submitFormNumber():void {
    console.log(this.validateFormNumber.value)
    this.size= this.validateFormNumber.value.number;
    this.showNext=true;
  }

  enrollOne(){
    const enrollment = {
      state :"inProgress",
      size:1,
      course :this.courseId,
    }
    const token = localStorage.getItem("ctc_mission_auth_token")

    this.http.post(environment.baseApiUrl +"/enrollment",enrollment,{headers:{
        "Authorization" : "bearer "+token

      }}).subscribe((response)=>console.log(response))
      this.router.navigate(['/dashboard-client'])

  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `fullName${id}`,
      controlEmail : `email${id}`

    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,

      new FormControl(null, Validators.required)
    );
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlEmail,

      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string;controlEmail:string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const newObj = this.validateForm.value
      let newArr = []
      let i =0;
      let elt = { fullName :"" , email:""}
      for (const [key, value] of Object.entries(newObj)) {
        if(i%2==0) {
          elt.fullName= String(value);
          i++
        } else {
          elt.email= String(value)
          console.log(elt)
          newArr.push({...elt})
          i++
        }

      }
      const enrollment = {
        course: this.courseId,
        extraInformations:newArr,
        state:"inProgress",
        size:newArr.length
      }
      const token = localStorage.getItem("ctc_mission_auth_token")

      this.http.post(environment.baseApiUrl+"/enrollment"  ,enrollment,{headers:{
          "Authorization" : "bearer "+token
        }}).subscribe((response)=>console.log(response))
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }



  }
