import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { Route, ActivatedRoute, Params } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { UsuarioService } from "../../services/usuario.service";
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { SnotifyService } from "ng-snotify";
import { UploadService } from "../../services/upload.service";



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  seguidores;
  sigue;
  actualizar: FormGroup;
  editarPerfil:boolean = false;
  user:Usuario;
  userConect:Usuario;
  userPerfil:Usuario;
  propio: boolean;
  url: string = "http://localhost:3800/api/recetaImageFile/";

  constructor(private _login: LoginService,
              private activateRoute: ActivatedRoute,
              private _snotifyService: SnotifyService,              
              private _userService: UsuarioService,
              private _uploadService: UploadService
            ) {
                this.propio = false;
                this.userConect = this._login.getDatosUser();
    this.activateRoute.params.subscribe(params => {
      this._userService.getUsuario(params['id']).subscribe(data => {
        this.userPerfil = data.usuario;
        if(this.userPerfil._id === this.userConect._id){
          this.propio = true;
          this.userConect = data.usuario;
          this.userConect.password = "";          
        }
        this._userService.setUserSelect(data.usuario._id);
        this._userService.getSeguidosUser(data.usuario._id).subscribe(follows =>{
          console.log(`data follows -> ${follows.follows.length} `);
          this._userService.setNumSeguidos(follows.follows.length);
        });

        this._userService.getSeguidoresUser(data.usuario._id).subscribe(followers=>{
          console.log(`Followers -> ${followers.follows.length}`);
          this._userService.setnumSeguidores(followers.follows.length);
        });

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
      localStorage.setItem('userIndentificado', JSON.stringify(datos.usuario));              
      this.editarPerfil = false;
    });

  }

  samePass = function (fg: FormGroup) {
    return fg.get('password').value === fg.get('password2').value ? null : { 'mismatch': true };
  }

  ngDoCheck() {
    this.user = this._login.getDatosUser();
    this.sigue = this._userService.getNumSeguidos();
    this.seguidores = this._userService.getnumSeguidores();
  }


  public filesToUpload: Array<File>
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
    this._uploadService.makeFileRequest(`http://localhost:3800/api/userImage/${this.userConect._id}`, [], this.filesToUpload, 'image', this.userConect._id)
    .then((res:any)=>{
      console.log(`Antes -> ${this.userConect.image} `);
      this.userConect.image = res.usuario.image;
      console.log(`Después -> ${this.userConect.image} `);      
    });
  }

}
