import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { LoginService } from "../../services/login.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  user:Usuario = {
    nombre:"",
    apellido:"",
    nick:"",
    email:"",
    rol:"",
    image:"",
    password:"",
  }

  constructor(
    // private _loginService: LoginComponent,
    private _router:Router,
    private _route:ActivatedRoute
    ) {



    // Creacion del formulario
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

    console.log("Formulario de login creado");
    

   }

  ngOnInit() {
  }

  login(){
    console.log(`Email-> ${this.user.email}`);
    
  }

}
