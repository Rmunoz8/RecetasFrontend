import { Injectable } from '@angular/core';
import { Usuario } from "../interfaces/usuario.interfaces";
import { Http, Headers, RequestOptions } from "@angular/http";
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

    let token = localStorage.getItem('token');
    let tokenP = JSON.parse(token).token;
    console.log(`TOKEN SERVICE ${tokenP}`);
    let url = `${this.URL}${this.URLFollows}`;
    let headers = new Headers();

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', tokenP);

      console.log(`Haces la llamada?`);
    return  this.http.get(url).map(res => {
        console.log(`${res.json()}`);
        
    });


    // return this.http.get(url, opts).map((res, err) =>{

    //   if(err){
    //     console.log(`ERROR -> ${err} `);
    //     return err
    //   };

    //   let resp = res.json();
    //   console.log(`SEGUIDOS -> ${resp} `);
    //   return resp
    // });

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
