import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import * as arg from 'arg';
import { event } from 'src/app/models/event.model';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import {ICourses} from "./courseInetrface";
import {map} from "rxjs/operators";
import {PlanningService} from "./planning.service";
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  @ViewChild('calendar', { static: true }) calendar!: FullCalendarComponent;
  isCalendarViewContext: boolean;
  coursesList : ICourses[] = []
 // events:
isAdmin=false;
  calendarOptions: CalendarOptions = {
    height:700,
    headerToolbar: { center: 'dayGridMonth,timeGridWeek,timeGridDay' },
    plugins : [timeGridPlugin],
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this), // bind is important!
    events: "http://localhost:3000/courses/calendar/event",
  };

  constructor( private planningService:PlanningService) {
    this.isCalendarViewContext = true;
  }

  ngOnInit(): void {
    this.planningService.getCourses().pipe(map(
      (responseData)=>{
        console.log(responseData)
        return responseData.data;
      }
    )).subscribe(
      (user)=>{console.log(user);
        this.coursesList=(user);
        console.log(this.coursesList);
      }
    );
    const role = localStorage.getItem("ctc_mission_auth_role")
    if(role && role==="admin") {
      this.isAdmin=true
    }else {
      this.isAdmin=false
    }
  }

  handleEventClick(arg: any) {
    arg.jsEvent.preventDefault(); // don't let the browser navigate

    alert('Event ' + arg.event.title + 'is going to open another page ');
    if (arg.event.url) {
      window.open(arg.event.url);
    }
  }

  /*
  addEvent(event: event) {
    this.events.push(event);
    this.calendar.getApi().addEvent(event);
  }

   */

  handleAddClick() {
    window.open('http://localhost:4200/AddEventForm');
    const event: event = {
      title: 'test',
      date: '2022-04-28',
      url: 'google.com',
    };
   // this.addEvent(event);
  }

  swapView() {
    this.isCalendarViewContext = !this.isCalendarViewContext;
  }
}
