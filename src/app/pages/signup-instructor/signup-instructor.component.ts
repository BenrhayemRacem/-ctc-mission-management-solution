import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {MatChipInputEvent} from '@angular/material/chips';
import {  MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import {environment} from "../../../environments/environment";

export interface Course {
  name: string;
}
@Component({
  selector: 'app-signup-instructor',
  templateUrl: './signup-instructor.component.html',
  styleUrls: ['./signup-instructor.component.scss']
})
export class SignupInstructorComponent implements OnInit {
  validateForm!: FormGroup;
  textl:string="signup";
  successMessage=false;
  errorMessage!:string[];
  addOnBlur = true;
  plainFooter = 'plain extra footer';
  isUserSubscription =true;


  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  courses: Course[] = [];
  trainingCourseCtrl=new FormControl();
  filteredCourses: Observable<string[]>;
  fixedCourses :string[] = ['Javascript', 'PHP', 'Flutter', 'Symfony', 'JEE'];
  @ViewChild('trainingCourseInput') trainingCourseInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Course
    if (value) {
      this.courses.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
    this.trainingCourseCtrl.setValue(null);

  }

  remove(course: Course): void {
    const index = this.courses.indexOf(course);

    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.courses.push({name:event.option.viewValue});
    console.log(event.option.value);
    this.trainingCourseInput.nativeElement.value = '';
    this.trainingCourseCtrl.setValue(null);
    console.log(this.courses);
  }
  constructor(private fb: FormBuilder,private http:HttpClient) {
    this.filteredCourses = this.trainingCourseCtrl.valueChanges.pipe(
      startWith(null),
      map((course: string | null) => (course ? this._filter(course) : this.fixedCourses.slice())),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.fixedCourses.filter(course => course.toLowerCase().includes(filterValue));
  }
  submitForm(): void {
console.log(this.validateForm.value)
   // console.log(this.trainingCourseCtrl)
    const instructorToSave = {
        startDate: this.validateForm.value.dates[0],
      endDate: this.validateForm.value.dates[1],
      cv : this.validateForm.value.cv,
      resume:this.validateForm.value.resume,
      professionalImage: this.validateForm.value.professionalImage,
      user :{
          firstName : this.validateForm.value.firstName,
        lastName : this.validateForm.value.lastName,
        email:this.validateForm.value.email,
        cin:this.validateForm.value.cin,
        phoneNumber:this.validateForm.value.phoneNumber,
        password:this.validateForm.value.password,
        repeat_password: this.validateForm.value.cpassword,
      }
    }
    this.http.post(environment.baseApiUrl+"/instructor",instructorToSave).subscribe((response)=>console.log(response))
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
      cv : [null,[Validators.required]],
      dates : [null,[Validators.required]],
      professionalImage:[null,[Validators.required]],
      resume:[null,[Validators.required]]
    });
  }
  showUserSubscription(b:boolean){
    this.isUserSubscription=b;
  }




}
