import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from "../../interfaces/usuario.interfaces";
import { UsuarioService } from "../../services/usuario.service";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  url: string = "http://localhost:3800/api/recetaImageFile/";
  usuarios:Usuario[] = [];
  user:Usuario;
  userConect:Usuario;
  constructor(private _usuarioService:UsuarioService,
              private router:Router,
              private _loginService:LoginService) {

                this.userConect = this._loginService.getDatosUser();

                this._usuarioService.getAllUsuarios().subscribe(data=>{
                  this.usuarios = data;
                });
               }

  ngOnInit() {
  }

  ifPerfil(id:string){
    this.router.navigate(['/perfil', id]);    
  }


}
