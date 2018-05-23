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
      nick: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    console.log('Formulario de registro creado');

  }

  ngOnInit() {
  }

  registro(){
    console.log(`Usuario -> ${this.usuario.nombre}
${this.usuario.apellido}
${this.usuario.nick}
${this.usuario.email}
${this.usuario.password} `);
    
    
  }

}
