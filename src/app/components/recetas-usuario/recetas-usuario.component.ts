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

  @Input('usuario') user: Usuario;  
  recetas:Receta[] = [];
  vacio: boolean;
  url: string = "http://localhost:3800/api/recetaImageFile/";
  constructor(
    private _recetaService:RecetaService,
    private router: Router,
    private _userService: UsuarioService  
  ) {


   }

  ngOnInit() {
    this.user = this._userService.getUserSelect();
    setTimeout(() => {
      console.log(`NICK-> ${this.user.nick}
ID-> ${this.user._id} `);

      this._recetaService.getRecetasUser(this.user._id).subscribe(data => {
        console.log(`RECETAS!!! -> ${JSON.stringify(data)} `);
        
        if (data.recetas.length === 0) {
          this.vacio = true
        } else {
          this.vacio = false;
          this.recetas = data.recetas;
        }
      });
    }, 2000);
  }

  ngDoCheck() {
    this.user = this._userService.getUserSelect();
  }

  verReceta(i: number) {
    console.log(i);
    this.router.navigate(['/receta', i]);
  }

}
