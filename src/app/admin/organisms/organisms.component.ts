import { Component, OnInit } from '@angular/core';
import {map} from "rxjs/operators";
import {OrganismTableService} from "./organism-table.service";
import {IOrganism} from "./organismInterface";

@Component({
  selector: 'app-organisms',
  templateUrl: './organisms.component.html',
  styleUrls: ['./organisms.component.scss']
})
export class OrganismsComponent implements OnInit {
  j=0;
  i = 0;
  editId: string | null = null;
  listOfData: IOrganism[] = [];
  constructor( private instructorService : OrganismTableService) { }
  addRow(): void {

  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }
  ngOnInit(): void {
    this.instructorService.getOrganisms().pipe(map(
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

}
