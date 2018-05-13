import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RecetaService } from "../../services/receta.service";
import { Receta } from "../../interfaces/receta.interface";

@Component({
  selector: 'app-vista-receta',
  templateUrl: './vista-receta.component.html',
  styleUrls: ['./vista-receta.component.css']
})
export class VistaRecetaComponent implements OnInit {

  // receta:Receta = {
  //   nombre:"",
  //   usuario:"",
  //   pasos:"",
  //   dificultad:"",
  //   img:""
  // };

  receta:any = [];

  constructor(private activateRoute:ActivatedRoute,
              private _recetasService:RecetaService) {
                this.activateRoute.params.subscribe(params =>{
                 this._recetasService.getReceta(params['id']).subscribe(data=>{
                  console.log(data);
                  this.receta = data;
                 });
                });
              }

  ngOnInit() {
  }

}
