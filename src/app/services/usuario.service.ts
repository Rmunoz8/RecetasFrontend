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
  URLuserUpdate: string = "/userUpdate";
  URLfollow: string = '/follow';
  URLnoFollow: string = '/unFollow';
  URLesSeguido: string = "/esSeguido";

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

   userUpdate(user:Usuario){

    let body = JSON.stringify(user);
     let url = `${this.URL}${this.URLuserUpdate}/${user._id}`
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, body, {headers}).map(res=>{
      console.log(`Actualización -> ${res.json()} `);
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
     let userConect = this._loginService.getDatosUser();


     let fo = {
       usuario : userConect._id,
       followed : id
     }
     let body = JSON.stringify(fo);
     let url = `${this.URL}${this.URLfollow}`;
     let headers = new Headers({
       'Content-Type': 'application/json'
     });  
     return this.http.post(url, body, {headers}).map( res =>res.json());
   }

   noSeguirUsuario(id:string){

    let userConect = this._loginService.getDatosUser();

    let fo = {
      usuario : userConect._id,
      followed : id
    }

    let body = JSON.stringify(fo);
    let url = `${this.URL}${this.URLnoFollow}`;
     let headers = new Headers({
       'Content-Type': 'application/json'
     });  

     return this.http.post(url, body, {headers}).map(res =>res.json());

   }

   esSeguido(id:string){

    let userConect = this._loginService.getDatosUser();

    let fo = {
      usuario: userConect._id,
      followed: id
    }

    let body = JSON.stringify(fo);
    let url = `${this.URL}${this.URLesSeguido}`;
     let headers = new Headers({
       'Content-Type': 'application/json'
     });  

     return this.http.post(url, body, {headers}).map(res =>res.json());

   }

}
