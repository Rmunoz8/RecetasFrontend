import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Usuario } from "../interfaces/usuario.interfaces";
import 'rxjs/Rx';

@Injectable()
export class UsuarioService {

  URL: string = "http://localhost:3800/api";
  URLgetAllUsuarios:string = "/allUsers";
  URLnuevoUser:string = "/user";

  constructor(private http:Http) {
    console.log("Servicio Usuarios listo");
   }

   getAllUsuarios(){     
     let url = `${this.URL}${this.URLgetAllUsuarios}`;     
     return this.http.get(url).map(res => res.json());
   }

   neuvoUsuario(usuario:Usuario){

    let body = JSON.stringify(usuario);
    let url = `${this.URL}${this.URLnuevoUser}`;
    let headers = new Headers({
       'Content-Type': 'application/json'
    }); 

    return this.http.post(url, body, {headers}).map(res =>{
      console.log(res.json());
      return res.json();
    });

   }

}
