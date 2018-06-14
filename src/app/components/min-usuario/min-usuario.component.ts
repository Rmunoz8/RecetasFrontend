import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Usuario } from "../../interfaces/usuario.interfaces";
import { Router } from "@angular/router";
import { UsuarioService } from "../../services/usuario.service";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-min-usuario',
  templateUrl: './min-usuario.component.html',
  styleUrls: ['./min-usuario.component.css']
})
export class MinUsuarioComponent implements OnInit {

  url: string = "http://localhost:3800/api/recetaImageFile/";

  @Input('usuario') user: Usuario;
  @Output() cerrarVenta = new EventEmitter();

  constructor(private _usuarioService: UsuarioService,
    private router: Router,
    private _loginService: LoginService) { }

  ngOnInit() {
  }
  ifPerfil(id: string) {
    this._loginService.setPulsado(false);
    this._loginService.setPulsadoSeguir(false);
    setTimeout(() => {
      this.router.navigate(['/perfil', id]);
    }, 500);
  }

}
