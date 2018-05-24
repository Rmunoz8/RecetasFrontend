import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../../services/usuario.service";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: 'app-btn-seguir',
  templateUrl: './btn-seguir.component.html',
  styleUrls: ['./btn-seguir.component.css']
})
export class BtnSeguirComponent implements OnInit {

  idUser = "";

  constructor(
    private _userService:UsuarioService,
    private _snotifyService: SnotifyService
  ) { }

  ngOnInit() {
  }

  seguirUsuario(){
    setTimeout(() => {
      this._userService.seguirUsuario(this._userService.getUserSelect()).subscribe(datos =>{
        if(datos.message){
          this._snotifyService.error(datos.message, {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false
          });
        }else{
          this._snotifyService.success(`Usuario seguido`, {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false
          });
        }
      });
    }, 500);
  }

}
