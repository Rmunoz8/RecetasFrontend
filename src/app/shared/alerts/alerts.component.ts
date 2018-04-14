import { Component, OnInit } from '@angular/core';
import { AlertsService } from "../../services/alerts.service";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private _alerts: AlertsService) { }

  ngOnInit() {
  }

  // mostrarAlert(){
  //   console.log("Dentro de componente");
    
  //   this._alerts.prueba();
  // }

}
