import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { RecetaService } from "../../services/receta.service";
import { Receta } from "../../interfaces/receta.interface";
import { Router } from '@angular/router';
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-recetas-usuario',
  templateUrl: './recetas-usuario.component.html',
  styleUrls: ['./recetas-usuario.component.css']
})
export class RecetasUsuarioComponent implements OnInit {

  @Input('recetas') recetas: Receta;  
  // recetas:Receta[] = [];
  vacio: boolean;
  url: string = "http://localhost:3800/api/recetaImageFile/";
  constructor(
    private _recetaService:RecetaService,
    private router: Router,
    private _userService: UsuarioService  
  ) {


   }

  ngOnInit() {
  }

  ngDoCheck() {
  }

  verReceta(i: number) {
    console.log(i);
    this.router.navigate(['/receta', i]);
  }

}
