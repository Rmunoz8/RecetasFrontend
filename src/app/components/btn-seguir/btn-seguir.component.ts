import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from "../../services/usuario.service";
import { SnotifyService } from "ng-snotify";
import { Usuario } from "../../interfaces/usuario.interfaces";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-btn-seguir',
  templateUrl: './btn-seguir.component.html',
  styleUrls: ['./btn-seguir.component.css']
})
export class BtnSeguirComponent implements OnInit {

  userLog: Usuario;
  pulsado = false;
  @Input('usuario') user: Usuario;
  seguido = null;
  propio = null;
  esSeguido;
  constructor(
    private _userService:UsuarioService,
    private _snotifyService: SnotifyService,
    private _loginService: LoginService
  ) {


   }

  ngOnInit() {
    setTimeout(() => {

      this.userLog = this._loginService.getDatosUser()

      if(this.userLog._id === this.user._id){
        this.propio = true;
      }else{
        this.propio = false;
      }

      this._userService.esSeguido(this.user._id).subscribe(datos => {

        if (datos.estado == true) {
          this.esSeguido = true;
        } else {
          this.esSeguido = false;
        }
      });
    }, 500);


  }

  ngDoCheck() {
    this.seguido = this.esSeguido;
  }

  seguirUsuario(){
    if(!this.pulsado){
      this.pulsado = true;
      setTimeout(() => {
        this._userService.seguirUsuario(this.user._id).subscribe(datos => {
          if (datos.message) {
            this._snotifyService.error(datos.message, {
              timeout: 2000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false
            });
          } else {
            this.esSeguido = true;
            this._snotifyService.success(`Usuario seguido ${this.user.nick} `, {
              timeout: 2000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false
            });
          }
        });
        this.pulsado = false;
      }, 500);
    }
  }

  noSeguirUsuario(){
    if(!this.pulsado){
      this.pulsado = true;
      setTimeout(() => {
        this._userService.noSeguirUsuario(this.user._id).subscribe(datos => {
          if (datos.message === "Error al dejar de seguir") {
            this._snotifyService.error(datos.message, {
              timeout: 2000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false
            });
          } else {
            this.esSeguido = false;
            this._snotifyService.success(`Dejaste de seguir a ${this.user.nick} `, {
              timeout: 2000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false
            });
          }
        });
        this.pulsado = false
      }, 500);
    }

  }

}
