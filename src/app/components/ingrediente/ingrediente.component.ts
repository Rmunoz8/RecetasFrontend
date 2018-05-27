import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {

  _ref:any;
  ingrediente: string = 'Ingrediente';
  cantidad: string = 'Cantidad';

  constructor() { }

  ngOnInit() {
  }

  deleteOne(){
    this._ref.clear()
  }

}
