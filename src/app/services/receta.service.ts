import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Receta } from "../interfaces/receta.interface";

import 'rxjs/Rx';

@Injectable()
export class RecetaService {


  recetas: Array<Receta>;

  URL: string = "http://localhost:3800/api";
  URLCrear: string = "/crearReceta";
  URLgetRecetas: string = "/dameRecetas";
  URLrecetaById: string = "/dameRecetaById/";
  URLrecetaUser: string = "/recetasUsuario/";

  constructor(private http:Http) {
    console.log("Servicio Recetas listo");
   }

  neuevaReceta(receta: Receta) {
    let body = JSON.stringify(receta);
    let url = `${this.URL}${this.URLCrear}`;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });    
    return this.http.post( url, body, {headers} ).map( res=>{
      console.log(res.json());
      return res.json();
    });
  }

   getRecetas(){
    let url = `${this.URL}${this.URLgetRecetas}`
    return this.http.get(url).map(res=>res.json());
   }
   getRecetasUser(id:string){
    let url = `${this.URL}${this.URLrecetaUser}${id}`;    
    return this.http.get(url).map(res=>res.json());
   }

   getReceta(i:string){

    let url = `${this.URL}${this.URLrecetaById}${i}`    
    return this.http.get(url).map(res=>res.json());
   }

   setRecetas(recetas:Array<Receta>){
     this.recetas = recetas;
   }

   getArrayRecetas(){
     return this.recetas;
   }

}
