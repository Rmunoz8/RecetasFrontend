import { Injectable } from '@angular/core';
import { Usuario } from "../interfaces/usuario.interfaces";
import { Http, Headers, RequestOptions } from "@angular/http";
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  URL: string = "http://localhost:3800/api";
  URLLogin: string = "/login";
  URLFollows: string = "/myFollows";
  URLConters: string = "/counters";
  token:string;
  user:Usuario;
  seguidos:Array<string> = [];

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

  getFollows(): Observable<any>{

      let body = JSON.stringify(this.user._id);
      let url = `${this.URL}${this.URLFollows}/${this.user._id}`;
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      return this.http.get(url).map(res =>res.json());
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

  // getCounter(userId = null): Observable<any>{
  //   let headers = new Headers().set('Content-Type', 'application/json')
  //                               .set('Authorization', this.getToken());

  //   if(userId != null){
  //     return this.http.get(`${this.URL}${this.URLConters}/${userId}`, {headers:headers});
  //   }else{
  //     return this.http.get(`${this.URL}${this.URLConters}`, { headers: headers });      
  //   }

  // }

}
