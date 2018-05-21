import { Component, DoCheck, OnInit } from '@angular/core';
import { LoginService } from "./services/login.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'Red Social';
  public user;

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snotifyService: SnotifyService  
  ){
  }

  ngOnInit(){
    this.user = this._loginService.getDatosUser();
    console.log(this.user);
  }

  ngDoCheck() {
    this.user = this._loginService.getDatosUser();
  }

}
