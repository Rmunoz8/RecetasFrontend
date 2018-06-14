import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Usuario } from "../../interfaces/usuario.interfaces";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  user:Usuario

  constructor(private _loginService:LoginService) { }

  ngOnInit() {
    this.user = this._loginService.getDatosUser();    
  }

}
