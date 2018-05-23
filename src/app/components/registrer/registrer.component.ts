import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { UsuarioService } from "../../services/usuario.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {

  regForm: FormGroup;
  usuario: Usuario = {
    _id:"",
    apellido:"",
    email:"",
    image:"",
    nick:"",
    nombre:"",
    password:"",
    rol:""
  };
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _snotifyService: SnotifyService
  ) {

    this.regForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      apellido: new FormControl("", Validators.required),
      nick: new FormControl("", [Validators.required,
                                this.nombreCorrecto]),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      password2: new FormControl("", [Validators.required,
                                      this.samePass])
    });

    console.log('Formulario de registro creado');

  }

  ngOnInit() {
  }

  registro(){
    
  console.log(`USUARIO -> ${this.usuario.nombre}
  ${this.usuario.apellido}
  ${this.usuario.nick}
  ${this.usuario.email}
  ${this.usuario.password}`);
  
    
  }

  nombreCorrecto(control: FormControl):{[s:string]:boolean}{

    if(control.value.length <= 2){
      return {
        nombreCorrecto: true
      }
    }
    return null;
  }

  samePass(pass2: FormControl, pass1: FormControl):{[s:string]:boolean}{
    if (pass2.value === pass1.value) {
      return {
        nombreCorrecto: true
      }
    }
    return null;
  }

}
