import {Component, Input, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { UsersTableService } from './users-table.service';
import { IUsers } from './usersInterface';








@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  j=0;
  i = 0;
  editId: string | null = null;
  listOfData: IUsers[] = [];
  showUserDetails="";
   isShowUser=false;
   @Input() adminContext=false


constructor(private usersTable:UsersTableService){}

  addRow(): void {

  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {
  console.log(this.isShowUser)
   this.usersTable.getUsers().pipe(map(
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
  showUserInfos( id:string){
  console.log(id)
   this.showUserDetails=id;
  this.isShowUser=true
  }


  }


