import { Component, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { Route, ActivatedRoute, Params } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { UsuarioService } from "../../services/usuario.service";
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { SnotifyService } from "ng-snotify";
import { UploadService } from "../../services/upload.service";
import { Receta } from "../../interfaces/receta.interface";
import { RecetaService } from "../../services/receta.service";



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  recetas:Array<Receta>;
  userSeguidos:Array<Usuario> = [];
  userSeguidores:Array<Usuario> = [];
  seguidores;
  sigue;
  actualizar: FormGroup;
  verSeguidores: boolean = false;  
  verSigue:boolean = false;
  editarPerfil:boolean = false;
  user:Usuario;
  userConect:Usuario;
  userPerfil:Usuario = {
    _id: "",
    apellido: "",
    email: "Correo",
    image: "",
    nick: "Nick",
    nombre: "Nombre",
    password: "",
    rol: ""
  }
  propio: boolean;
  url: string = "http://localhost:3800/api/recetaImageFile/";

  constructor(private _login: LoginService,
              private activateRoute: ActivatedRoute,
              private _snotifyService: SnotifyService,              
              private _userService: UsuarioService,
              private _uploadService: UploadService,
              private _recetaService: RecetaService
            ) {
    this.cerrarVentanas();
    this.verSigue = false;
    this.editarPerfil = false;
    this.verSeguidores = false;
    this.propio = false;
    let ctx = this;

    this.userConect = this._login.getDatosUser();

    this.activateRoute.params.subscribe(params => {

      this._userService.getUsuario(params['id']).subscribe(data => {

        this.userPerfil = data.usuario;

        if (this.userPerfil._id === this.userConect._id) {
          this.propio = true;
          this.userConect = data.usuario;
          this.userConect.password = "";
        }else{
          this.propio = false;
        }

        this._recetaService.getRecetasUser(data.usuario._id).subscribe(recetas=>{
          this._recetaService.setRecetas(recetas.recetas);
        });

        this._userService.setUserSelect(data.usuario);

        this._userService.getSeguidosUser(data.usuario._id).subscribe(follows => {

          this._userService.setNumSeguidos(follows.follows.length);
          ctx.userSeguidos = [];

          for (let i = 0; i < follows.follows.length; i++) {
            ctx.userSeguidos.push(follows.follows[i].followed);
          }
          this._userService.setuserSeguidos(this.userSeguidos);
        });

        this._userService.getSeguidoresUser(data.usuario._id).subscribe(followers => {

          this._userService.setnumSeguidores(followers.follows.length);          
          ctx.userSeguidores = [];

          for (let i = 0; i < followers.follows.length; i++) {
            ctx.userSeguidores.push(followers.follows[i].usuario);
          }
          this._userService.setuserSeguidores(this.userSeguidores);
        });

      });

    });



   }

  ngOnInit() {
    this.cerrarVentanas();
    this.verSigue = false;
    this.editarPerfil = false;
    this.verSeguidores = false;  
    this.propio = false;
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
    this.userSeguidos = this._userService.getUserSeguidos();
    this.userSeguidores = this._userService.getUserSeguidores();
    this.recetas = this._recetaService.getArrayRecetas();
    this.verSeguidores = this._login.getPulsado();
    this.verSigue = this._login.getPulsadoSeguir();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cerrarVentanas();
  }


  public filesToUpload: Array<File>
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this._uploadService.makeFileRequest(`http://localhost:3800/api/userImage/${this.userConect._id}`, [], this.filesToUpload, 'image', this.userConect._id)
    .then((res:any)=>{
      this.userConect.image = res.usuario.image;
    });
  }

  salirSeguidos(){
    this._login.setPulsadoSeguir(false);            
    this.verSigue = false;
  }
  salirSeguidores(){
    this._login.setPulsado(false);        
    this.verSeguidores = false;
  }

  abrirSeguidos(){
    this._login.setPulsadoSeguir(true);
    this.verSigue = true;
  }
  abrirSeguidores(){    
    this._login.setPulsado(true);    
    this.verSeguidores = true;    
  }

  cerrarVentanas(){
    this.verSeguidores = false;
    this.verSigue = false;
  }

}
