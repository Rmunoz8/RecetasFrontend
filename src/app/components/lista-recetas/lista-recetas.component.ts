import { Component, OnInit } from '@angular/core';
import { RecetaService, Receta } from '../../services/receta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css']
})
export class ListaRecetasComponent implements OnInit {

  recetas:Receta[] = [];

  constructor(private _recetaService:RecetaService,
              private router:Router) {

               }

  ngOnInit() {
    this.recetas = this._recetaService.getRecetas();
  }

  verReceta(i:number){
    console.log(i);
    this.router.navigate(['/receta', i]);
  }

}
