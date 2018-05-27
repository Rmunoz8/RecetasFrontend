import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { Route, ActivatedRoute, Params } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { UsuarioService } from "../../services/usuario.service";
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { SnotifyService } from "ng-snotify";



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  actualizar: FormGroup;
  editarPerfil:boolean = false;
  user:Usuario
  userConect:Usuario
  propio: boolean;
  url: string = "http://localhost:3800/api/recetaImageFile/";

  constructor(private _login: LoginService,
              private activateRoute: ActivatedRoute,
              private _snotifyService: SnotifyService,              
              private _userService: UsuarioService,
            ) {
                this.propio = false;
                this.userConect = this._login.getDatosUser();
    this.activateRoute.params.subscribe(params => {
      this._userService.getUsuario(params['id']).subscribe(data => {
        this.user = data.usuario;
        if(this.user._id === this.userConect._id){
          this.propio = true;
        }
        this._userService.setUserSelect(this.user._id);
      });
    });
   }

  ngOnInit() {

    this.userConect.password = "";

    this.actualizar = new FormGroup({
      nombre: new FormControl("", [Validators.required,
      Validators.pattern("^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$")]),
      apellido: new FormControl(""),
      nick: new FormControl("", [Validators.required,
      Validators.pattern("^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$")]),
      email: new FormControl("", [Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/)
      ]),
      password2: new FormControl("", Validators.required)
    }, this.samePass);

  }

  editar(){
    this.editarPerfil = true;
    console.log(`EDITAR-> ${this.user.nick} `);
  }

  save(){    
    
    this._userService.userUpdate(this.userConect).subscribe(datos=>{
      if(datos.message){
        this._snotifyService.error(datos.message, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false
        });
      }else{
        this._snotifyService.success('Usuario actualizado', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false
        });
      }
      this.editarPerfil = false;
    });

  }

  samePass = function (fg: FormGroup) {
    return fg.get('password').value === fg.get('password2').value ? null : { 'mismatch': true };
  }

}
