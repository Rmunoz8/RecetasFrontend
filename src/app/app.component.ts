import { Component } from '@angular/core';
import { LoginService } from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService]
})
export class AppComponent {
  public title = 'Red Social';
  public user;

  constructor(
    private _loginService: LoginService    
  ){
  }

  ngOnInit(){
    this.user = this._loginService.getDatosUser();
    console.log(this.user);
  }

}
