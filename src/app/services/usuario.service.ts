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
  URLgetFollows: string = '/myFollows/';
  URLgetFollowers: string = '/yourFollows/';

  userSelect: Usuario;
  user:Usuario;

  numSeguidos;
  numSeguidores;

  userSeguidos:Array<Usuario>;
  userSeguidores:Array<Usuario>;


  constructor(private http:Http,
  private _loginService:LoginService) {
    this.user = this._loginService.getDatosUser();
   }

   setuserSeguidos(users:Array<Usuario>){
     this.userSeguidos = users;
   }

   getUserSeguidos(){
     return this.userSeguidos;
   }

   setuserSeguidores(users:Array<Usuario>){
     this.userSeguidores = users;
   }

   getUserSeguidores(){
     return this.userSeguidores;
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
      return res.json();
    });

   }

   setnumSeguidores(num){
    this.numSeguidores = num;
   }

   getnumSeguidores(){
     return this.numSeguidores;
   }

   getUserSelect(){
     return this.userSelect;
   }

   setUserSelect(user:Usuario){
     
     this.userSelect = user;
   }

   getUsuario(id:string){
     let url = `${this.URL}${this.URLuser}/${id}`
     return this.http.get(url).map(res=>res.json());
   }

   setNumSeguidos(num){
    this.numSeguidos = num;
   }

   getNumSeguidos(){
     return this.numSeguidos;
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

  getSeguidosUser(id: string) {

    let url = `${this.URL}${this.URLgetFollows}${id}`;

    return this.http.get(url).map(res =>res.json());

  }

  getSeguidoresUser(id:string){

    let url = `${this.URL}${this.URLgetFollowers}${id}`;

    return this.http.get(url).map(res =>res.json());

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
