import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.scss'],
  providers : [DatePipe]
})
export class EnrolledCoursesComponent implements OnInit {

  @Input() name:string ="";
  @Input() description:string ="";
  @Input() price:string ="";
  @Input() startDate:string ="";
  @Input() endDate:string ="";
  @Input() image:string="1uctjeIX5_-mxpEZo0rWKKBWr3gt49GsW";
  @Input() id:string=""
  @Input() enrollContext='false'
  @Input() inscriptionText = "s'inscrire"
  @Input() enrollmentId=""

startDateFormat : String|null ="" ;
endDateFormat : String|null ="" ;
  constructor( private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.startDateFormat = this.datePipe.transform(this.startDate)
    this.endDateFormat = this.datePipe.transform(this.endDate)
  }

}
