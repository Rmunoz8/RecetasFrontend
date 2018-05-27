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
  userConect:Usuario
  propio: boolean;

  constructor(private _login: LoginService,
              private activateRoute: ActivatedRoute,
              private _userService: UsuarioService) {
                this.propio = false;
                this.userConect = this._login.getDatosUser();
    this.activateRoute.params.subscribe(params => {
      this._userService.getUsuario(params['id']).subscribe(data => {
        this.user = data.usuario;
        if(this.user._id === this.userConect._id){
          this.propio = true;
        }
        this._userService.setUserSelect(this.user._id);
      });
    });
   }

  ngOnInit() {
  }

}
