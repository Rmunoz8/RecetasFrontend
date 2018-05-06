import { Injectable } from '@angular/core';
import { Usuario } from "../interfaces/usuario.interfaces";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  public usuario: Usuario

  constructor() {
    console.log("Servicio login listo");
   }

}
