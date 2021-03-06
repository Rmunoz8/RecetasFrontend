import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListaRecetasComponent } from "./components/lista-recetas/lista-recetas.component";
import { VistaRecetaComponent } from './components/vista-receta/vista-receta.component';
import { CrearRecetaComponent } from "./components/crear-receta/crear-receta.component";
import { ListaUsuariosComponent } from "./components/lista-usuarios/lista-usuarios.component";
import { RegistrerComponent } from "./components/registrer/registrer.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/perfil/perfil.component";
import { ErrorComponent } from "./components/error/error.component";
import { InicioComponent } from "./components/inicio/inicio.component";

const APP_ROUTES: Routes = [
    
    {path: '', component: InicioComponent},
    {path: 'perfil/:id', component: PerfilComponent},
    { path: 'listaRecetas', component: ListaRecetasComponent },
    { path: 'receta/:id', component: VistaRecetaComponent },
    { path: 'crearReceta/:id', component: CrearRecetaComponent },
    { path: 'listaUsuarios', component: ListaUsuariosComponent },
    { path: 'registrer', component: RegistrerComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: ErrorComponent }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });