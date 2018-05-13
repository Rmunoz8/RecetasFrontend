import { Injectable } from '@angular/core';
import { Usuario } from "../interfaces/usuario.interfaces";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  usuario: Usuario
  URL: string = "http://localhost:3800/api";
  URLLogin: string = "/login";
  token:string;
  user:Usuario;

  constructor(private http:Http) {
    console.log("Servicio login listo");
   }

   accesoUsuario(userLog){

    let body = JSON.stringify(userLog);
    console.log(`BODY-> ${body} `);
    
    let url = `${this.URL}${this.URLLogin}`;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, body, {headers}).map(res=>res.json());

   }

   getDatosUser(){
     let userDatos = JSON.parse(localStorage.getItem('userIndentificado'));

     if (userDatos != "undefined"){
       this.user = userDatos;
   }else{
     this.user = null;
   }
     return this.user;
   
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;

  }

}
