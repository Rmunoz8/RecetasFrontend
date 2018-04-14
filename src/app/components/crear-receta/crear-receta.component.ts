import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecetaService } from "../../services/receta.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Receta } from "../../interfaces/receta.interface";
import { AlertsService } from "../../services/alerts.service";

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent implements OnInit {

  formulario: FormGroup;
  id:string;

  receta:Receta = {
    nombre:"",
    usuario:"",
    pasos:"",
    dificultad:"sinDificultad",
    img:"",
  }

  constructor(private _recetaService:RecetaService,
              private router:Router,
              private route:ActivatedRoute,
              private _alertService:AlertsService) {

    // Obtenemos id de la URL
    this.route.params.subscribe( parametros=>{
      this.id = parametros['id']; 
    });
    
    // Creacion del formulario
    this.formulario = new FormGroup({
      pasos: new FormControl("", Validators.required),
      img: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      usuario: new FormControl("", Validators.required),
      dificultad: new FormControl("", [Validators.required,
                                  this.dificultadSeleccionada]),
      
    });
    console.log("Formulario creado");
   }

  ngOnInit() {
  }

  crearReceta(){     
    this._recetaService.neuevaReceta(this.receta).subscribe(datos =>{   
      if(datos.message){
        this._alertService.alertFallo();
      }else{
        setTimeout(() => {
          this._alertService.alertCorrecto();
          this.router.navigate(['/crearReceta']);
        }, 2000);  
      }          
    },
    error=>{
      console.error(error)
    }
  );
    
  }

  // Validaciones propias
  dificultadSeleccionada(control: FormControl): { [s: string]: boolean } {
    if (control.value === "sinDificultad") {
      return {
        dificultadSeleccionada: true
      }
    }
    return null;
  }
}
