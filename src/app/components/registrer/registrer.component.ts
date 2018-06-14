import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { UsuarioService } from "../../services/usuario.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { SnotifyService } from "ng-snotify";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {

  regForm: FormGroup;
  usuario: Usuario = {
    _id: "",
    apellido: "",
    email: "",
    image: "",
    nick: "",
    nombre: "",
    password: "",
    rol: ""
  };
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _snotifyService: SnotifyService,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.regForm = new FormGroup({
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

  nombreCorrecto(control: FormControl): { [s: string]: boolean } {

    if (control.value.length <= 2) {
      return {
        nombreCorrecto: true
      }
    }
    return null;
  }

  samePass = function (fg: FormGroup) {
    return fg.get('password').value === fg.get('password2').value ? null : { 'mismatch': true };
  }

  faltanDatos() {
    this._snotifyService.error(`Comprueba que los datos sean correctos`, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false
    });
  }

  registro() {

    this._usuarioService.neuvoUsuario(this.usuario).subscribe(datos => {

      if (datos.message) {
        this._snotifyService.error(datos.message, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false
        });
      } else {
        this._snotifyService.success(`Usuario creado`, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false
        });

        let userLog = {
          email: this.usuario.email,
          password: this.usuario.password,
          gettoken: true
        }
        this._loginService.accesoUsuario(userLog).subscribe((datos) => {

          if (!datos.message) {
            userLog = {
              email: this.usuario.email,
              password: this.usuario.password,
              gettoken: false
            }
            let token = datos;
            this._loginService.accesoUsuario(userLog).subscribe((res) => {

              let userIndentificado = res.usuario;
              // Guardar informacion en el local storage
              localStorage.setItem('userIndentificado', JSON.stringify(userIndentificado));
              localStorage.setItem('token', JSON.stringify(token));
              this._snotifyService.success(`Bienvenido ${this.usuario.nick} `, {
                timeout: 2000,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false
              });
              this._router.navigate(['listaRecetas']);
            });
          } else {
            this._snotifyService.error(datos.message, {
              timeout: 2000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false
            });
          }
        });
      }
    })
  };
}
