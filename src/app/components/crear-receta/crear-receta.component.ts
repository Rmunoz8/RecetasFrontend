import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecetaService } from "../../services/receta.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Receta } from "../../interfaces/receta.interface";
import { AlertsService } from "../../services/alerts.service";
import { IngredienteComponent } from "../../components/ingrediente/ingrediente.component";
import { Usuario } from "../../interfaces/usuario.interfaces";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent implements OnInit {

  formulario: FormGroup;
  id:string;

  user: Usuario;
  receta:Receta = {
    nombre:"",
    usuario:"",
    pasos:"",
    dificultad:"sinDificultad",
    img:"",
    ingredientes: [] ,
    creado:null  
  }

  constructor(private _recetaService:RecetaService,
              private router:Router,
              private route:ActivatedRoute,
              private _alertService:AlertsService,
              private _loginService:LoginService) {

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
      ingredientes: new FormControl("", Validators.required)
      
    });
    console.log("Formulario creado");
   }

  ngOnInit() {
    this.user = this._loginService.getDatosUser();
    console.log(this.user);
    
  }

  deleteAll(){
    this.receta.ingredientes = [];
  }

  deleteOne(e){
    this.receta.ingredientes.splice(e, 1);

  }

  crearReceta(){     

    this.receta.usuario = this.user._id;
    this.receta.creado = this.getFecha();

    
    console.log(`Receta ->${JSON.stringify(this.receta)} `);
    

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


  getFecha(){
    let hoy = new Date();
    let dd = hoy.getDate();
    let mm = hoy.getMonth() + 1; //hoy es 0!
    let yyyy = hoy.getFullYear();

    if (dd < 10) {
      dd = Number('0' + dd);
    }

    if (mm < 10) {
      mm = Number('0' + mm);
    }

    let final = new Date(`${mm}/${dd}/${yyyy}`);

    return final;
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

  anyadirIngrediente(){
    this.receta.ingredientes.push({
      nombre:'Nombre',
      cantidad:'Cantidad'
    });
  }
}
