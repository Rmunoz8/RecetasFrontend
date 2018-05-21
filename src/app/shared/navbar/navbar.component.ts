import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Usuario } from "../../interfaces/usuario.interfaces";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:Usuario

  constructor(private _loginService:LoginService,
    private _route: ActivatedRoute,
    private _router: Router    ) {
   }

  ngOnInit() {
    this.user = this._loginService.getDatosUser();
    console.log(this.user);
        
  }

  logout() {
    localStorage.clear();
    this.user = null;
    this._router.navigate(['/']);
  }

  irPerfil(id:string){
    this._router.navigate(['perfil', id]);
  }

}
