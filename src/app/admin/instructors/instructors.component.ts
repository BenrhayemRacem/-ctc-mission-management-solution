import {Component, Input, OnInit} from '@angular/core';
import {IUsers} from "../users/usersInterface";
import {map} from "rxjs/operators";
import {InstructorsTableService} from "./instructors-table.service";
import {IInstructor} from "./instructorInterface";

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit {
  j=0;
  i = 0;
  editId: string | null = null;
  listOfData: IInstructor[] = [];
   showUserDetails: string="";
   isShowUser: boolean=false;
  @Input() adminContext=false

  constructor( private instructorService : InstructorsTableService) { }
  addRow(): void {

  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }
  ngOnInit(): void {
    this.instructorService.getInstructors().pipe(map(
      (responseData)=>{
        console.log(responseData)
        return responseData.data;
      }
    )).subscribe(
      (user)=>{console.log(user);
        this.listOfData=(user);
        console.log(this.listOfData);
      }
    );
  }
  doNotShowUserDetails(){
    this.isShowUser=false
  }

  showUserInfos(id:number) {
    console.log(id)
    this.showUserDetails=String(id);
    this.isShowUser=true
  }
}
