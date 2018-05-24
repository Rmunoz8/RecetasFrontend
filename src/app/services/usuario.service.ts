import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Usuario } from "../interfaces/usuario.interfaces";
import { LoginService } from "./login.service";
import 'rxjs/Rx';

@Injectable()
export class UsuarioService {

  URL: string = "http://localhost:3800/api";
  URLgetAllUsuarios:string = "/allUsers";
  URLuser:string = "/user";
  URLfollow: string = '/follow';

  userSelect = "";
  user:Usuario;

  constructor(private http:Http,
  private _loginService:LoginService) {
    console.log("Servicio Usuarios listo");
    this.user = this._loginService.getDatosUser();
    console.log(`User Identificado??? -> ${JSON.stringify(this.user)} `);
    
   }

   getAllUsuarios(){     
     let url = `${this.URL}${this.URLgetAllUsuarios}`;     
     return this.http.get(url).map(res => res.json());
   }

   neuvoUsuario(usuario:Usuario){

    let body = JSON.stringify(usuario);
    let url = `${this.URL}${this.URLuser}`;
    let headers = new Headers({
       'Content-Type': 'application/json'
    }); 

    return this.http.post(url, body, {headers}).map(res =>{
      console.log(res.json());
      return res.json();
    });

   }

   getUserSelect(){
     return this.userSelect;
   }

   setUserSelect(id:string){
     this.userSelect = id;
   }

   getUsuario(id:string){
     let url = `${this.URL}${this.URLuser}/${id}`
     return this.http.get(url).map(res=>res.json());
   }

   seguirUsuario(id:string){
     let fo = {
       usuario : this.user._id,
       followed : id
     }
     let body = JSON.stringify(fo);
     let url = `${this.URL}${this.URLfollow}`;
     let headers = new Headers({
       'Content-Type': 'application/json'
     });  
     return this.http.post(url, body, {headers}).map( res =>res.json());
   }
}
