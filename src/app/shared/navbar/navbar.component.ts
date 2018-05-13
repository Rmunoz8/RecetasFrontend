import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Usuario } from "../../interfaces/usuario.interfaces";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:Usuario

  constructor(private _loginService:LoginService) {
   }

  ngOnInit() {
    this.user = this._loginService.getDatosUser();
    console.log(this.user);
        
  }

}
