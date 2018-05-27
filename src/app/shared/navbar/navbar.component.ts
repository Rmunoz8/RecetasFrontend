import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Usuario } from "../../interfaces/usuario.interfaces";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:Usuario
  url: string = "http://localhost:3800/api/recetaImageFile/";
  constructor(private _loginService:LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snotifyService: SnotifyService
      ) {
   }

  ngOnInit() {
    this.user = this._loginService.getDatosUser();
    console.log(this.user);
        
  }

  logout() {
    this._snotifyService.info(`Hasta pronto ${this.user.nick} `, {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false
    });
    localStorage.clear();
    this.user = null;
    this._router.navigate(['/']);
  }

  irPerfil(id:string){
    this._router.navigate(['perfil', id]);
  }

  ngDoCheck() {
    this.user = this._loginService.getDatosUser();
  }

}
