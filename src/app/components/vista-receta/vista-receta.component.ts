import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RecetaService } from "../../services/receta.service";

@Component({
  selector: 'app-vista-receta',
  templateUrl: './vista-receta.component.html',
  styleUrls: ['./vista-receta.component.css']
})
export class VistaRecetaComponent implements OnInit {

  receta:any = {};

  constructor(private activateRoute:ActivatedRoute,
              private _recetasService:RecetaService) {
                this.activateRoute.params.subscribe(params =>{
                  this.receta = this._recetasService.getReceta(params['id']);
                })
              }

  ngOnInit() {
  }

}
