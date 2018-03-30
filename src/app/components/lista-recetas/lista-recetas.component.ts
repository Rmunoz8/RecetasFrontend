import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { Receta } from "../../interfaces/receta.interface";
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

                this._recetaService.getRecetas().subscribe(data=>{
                  this.recetas = data;
                });
               }

  ngOnInit() {
    // this.recetas = this._recetaService.getRecetas();
  }

  verReceta(i:number){
    console.log(i);
    this.router.navigate(['/receta', i]);
  }

  

}
