import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { Route, ActivatedRoute, Params } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user:Usuario

  constructor(private _login: LoginService,
              private activateRoute: ActivatedRoute,
              private _userService: UsuarioService) {
    this.activateRoute.params.subscribe(params => {
      this._userService.getUsuario(params['id']).subscribe(data => {
        console.log(data);
        this.user = data.usuario;
        this._userService.setUserSelect(this.user._id);
      });
    });
   }

  ngOnInit() {
  }

}
