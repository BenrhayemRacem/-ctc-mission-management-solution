import { HttpClient } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import {ProfileUpdateInterface} from "./profile-update.interface";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  validateForm!: FormGroup;
  textl:string="update";
  text2:string="Modify Password";
  date="13/10/2000";
  successMessage=false;
  errorMessage!:string[];
  image="/assets/Images/profile-placeholder.png"
  placeholder="/assets/Images/profile-placeholder.png"
  @Input() adminContext=false;

  authUser:ProfileUpdateInterface = {
    firstName:"",
    lastName:"",
    email:"",
    cin:"",
    phoneNumber:"",
    role:"",
    profileImage:"",
    id:"",
    instructor: {
      professionalImage:"",
      resume:"",
      cv:"",
      startDate:"",
      endDate:"",
      courses:[],
    },
    enrolled:[]

  }

  @Input() userId=""


  constructor(private fb: FormBuilder,private http:HttpClient ) {}
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const url = String( this.userId).length>0? environment.baseApiUrl+'/user/'+this.userId: environment.baseApiUrl+'/user'
const token = localStorage.getItem("ctc_mission_auth_token")
      this.http.patch(url,{...this.validateForm.value},{headers:{
        "Authorization" : "bearer "+token,
        }}).subscribe(
        responseData=>{
          console.log(responseData);
          this.successMessage=true;
        },
        error=>{
          console.log(error);
          this.errorMessage=error.error.message;
          this.successMessage=false;
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

  submitFormPassword():void{

  }
  ngOnInit(): void {

    //changer validateForm par editForm in html pour le form 1 et par editFormPassword pour le form 2
    console.log(this.userId)
const token = localStorage.getItem("ctc_mission_auth_token")
    const url =String( this.userId).length>0? environment.baseApiUrl+ '/user/one/'+ this.userId : environment.baseApiUrl+'/user/one';
    console.log(url)
    console.log( typeof this.userId)
    this.http.get<ProfileUpdateInterface>(url,{headers:{
      "Authorization" : "bearer "+token
      }}).subscribe(
      responseData => {
        console.log(responseData);
        //this.successMessage = true;
        this.validateForm = new FormGroup({
          firstName: new FormControl(responseData['firstName']),
          lastName: new FormControl(responseData['lastName']),
          email: new FormControl(responseData['email']),
          phoneNumber : new FormControl(responseData.phoneNumber)

        });
        this.authUser = responseData
        this.image = responseData.role==='instructor' || responseData.role=='instructor-request' ? 'https://drive.google.com/uc?export=view&id='+responseData.instructor.professionalImage : responseData.profileImage &&responseData.profileImage.length>0? 'https://drive.google.com/uc?export=view&id='+responseData.profileImage:this.placeholder
        console.log(this.image)
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
      }
    );

    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      cin: [null, [Validators.required]],
    })

  }

    //supprimer ce validate form apres avoir fixé les 2 autres formGroup
  /*  this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      cin: [null, [Validators.required]],
      password: [null, [Validators.required]],
      cpassword: [null, [Validators.required]],
    });

   */


}
