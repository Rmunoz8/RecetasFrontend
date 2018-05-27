import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { LoginService } from "../../services/login.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnotifyService } from "ng-snotify";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  token:"";
  userIndentificado:Usuario;
  usuario:Usuario = {
    nombre:"",
    apellido:"",
    nick:"",
    email:"",
    rol:"",
    image:"",
    password:"",
    _id: ""
  }

  userLog: {}

  constructor(
    private _loginService: LoginService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _snotifyService: SnotifyService
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
    this.userLog = {
      email: this.usuario.email,
      password: this.usuario.password,
      gettoken: true
    }
    this._loginService.accesoUsuario(this.userLog).subscribe((datos)=>{

      if(!datos.message){
        this.userLog = {
          email: this.usuario.email,
          password: this.usuario.password,
          gettoken: false
        }
        this.token = datos;
        this._loginService.accesoUsuario(this.userLog).subscribe((res)=>{
          
          this.userIndentificado = res.usuario;
          // Guardar informacion en el local storage
          localStorage.setItem('userIndentificado', JSON.stringify(this.userIndentificado));
          localStorage.setItem('token', JSON.stringify(this.token));
          this._snotifyService.success(`Bienvenido ${this.userIndentificado.nick} `, {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false
          });
          this._router.navigate(['listaRecetas']);
          console.log('Llegas??');
          setTimeout(() => {
            // this._loginService.getFollows().subscribe((res) => {
            //   console.log(`RES -> ${JSON.stringify(res)} `);
            // });
          }, 500);

        });
      }else{
        this._snotifyService.error(datos.message, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false
        });
      }
    });
  }

}
