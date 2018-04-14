import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {


  constructor() {
    console.log("Servicio Alertas activado");
   }

   alertCorrecto(){
     console.log("Mostrar Alert correcto");
   }
   alertFallo(){
     console.log("Mostrar Alert fallo");
   }

}
