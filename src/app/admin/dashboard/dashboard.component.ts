import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../pages/login/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  elementToShow=2;
  isShowUser=false;
  adminContext=true;

  constructor(private authService:AuthService , private router:Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedOut()){
      this.router.navigate(["/login"])
    }
  }
  handleElementToShow(index:number) {
    this.isShowUser = false;

    this.elementToShow = index ;
  }
  logout(){
    this.authService.logout()
    this.router.navigate(["/login"])
  }

}
