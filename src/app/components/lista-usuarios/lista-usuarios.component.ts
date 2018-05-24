import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from "../../interfaces/usuario.interfaces";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  user:Usuario;
  constructor(private _usuarioService:UsuarioService,
              private router:Router) {

                this._usuarioService.getAllUsuarios().subscribe(data=>{
                  this.usuarios = data;
                });
               }

  ngOnInit() {
  }

  ifPerfil(id:string){
    console.log(`Usuario -> ${id} `);
    this.router.navigate(['/perfil', id]);    
  }

}
