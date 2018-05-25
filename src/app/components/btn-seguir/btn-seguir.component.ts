import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from "../../services/usuario.service";
import { SnotifyService } from "ng-snotify";
import { Usuario } from "../../interfaces/usuario.interfaces";

@Component({
  selector: 'app-btn-seguir',
  templateUrl: './btn-seguir.component.html',
  styleUrls: ['./btn-seguir.component.css']
})
export class BtnSeguirComponent implements OnInit {

  // idUser = "";
  @Input('usuario') user: Usuario;
  seguido = false;
  constructor(
    private _userService:UsuarioService,
    private _snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    console.log(`hola ${JSON.stringify(this.user)} `);
    
    this._userService.esSeguido(this.user._id).subscribe(datos =>{
      if(datos.estado == false){
        console.log(datos.message);
      }else if(datos.estado == true){
        console.log(`Si se sigue ${this.user.nick} `);
      }else{
        console.log(`Nada`);
      }
    }); 
  }

  seguirUsuario(){
    setTimeout(() => {
      
      this._userService.seguirUsuario(this.user._id).subscribe(datos =>{
        if(datos.message){
          this._snotifyService.error(datos.message, {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false
          });
        }else{
          this._snotifyService.success(`Usuario seguido ${this.user.nick} `, {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false
          });
          console.log(`${JSON.stringify(datos)}`);
          
        }
      });
    }, 500);
  }

  noSeguirUsuario(){
    setTimeout(() => {
      
      this._userService.noSeguirUsuario(this.user._id).subscribe(datos =>{
        if (datos.message === "Error al dejar de seguir"){
          this._snotifyService.error(datos.message, {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false
          });
        }else{
          this._snotifyService.success(`Dejaste de seguir al usuario`, {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false
          });
          console.log(`${JSON.stringify(datos)}`);
        }
      });

    }, 500);
  }

}
