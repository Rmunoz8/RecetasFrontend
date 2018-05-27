import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { Receta } from "../../interfaces/receta.interface";
import { Router } from '@angular/router';
import { LoginService } from "../../services/login.service";
import { Usuario } from "../../interfaces/usuario.interfaces";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css']
})
export class ListaRecetasComponent implements OnInit {

  recetas:Receta[] = [];
  user: Usuario;
  userReceta: Usuario;
  url: string = "http://localhost:3800/api/recetaImageFile/";

  constructor(private _recetaService:RecetaService,
              private router:Router,
              private _loginService:LoginService,
              private _usuarioService:UsuarioService) {

                this._loginService.getFollows().subscribe((res) => {
                  console.log(`RES!!! -> ${res} `);
                });

                this._recetaService.getRecetas().subscribe(data=>{
                  this.recetas = data;
                });

                // this.userReceta = this._usuarioService.getUsuario(this.rec)

               }

  ngOnInit() {
    this.user = this._loginService.getDatosUser();    
  }

  verReceta(i:number){
    console.log(i);
    this.router.navigate(['/receta', i]);
  }
}
