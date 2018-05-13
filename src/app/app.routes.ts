import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListaRecetasComponent } from "./components/lista-recetas/lista-recetas.component";
import { VistaRecetaComponent } from './components/vista-receta/vista-receta.component';
import { CrearRecetaComponent } from "./components/crear-receta/crear-receta.component";
import { ListaUsuariosComponent } from "./components/lista-usuarios/lista-usuarios.component";
import { RegistrerComponent } from "./components/registrer/registrer.component";
import { LoginComponent } from "./components/login/login.component";
import { PrincipalComponent } from "./components/principal/principal.component";

const APP_ROUTES: Routes = [
    
    {path: '', component: LoginComponent},
    {path: 'principal', component: PrincipalComponent},
    { path: 'listaRecetas', component: ListaRecetasComponent },
    { path: 'receta/:id', component: VistaRecetaComponent },
    { path: 'crearReceta/:id', component: CrearRecetaComponent },
    { path: 'listaUsuarios', component: ListaUsuariosComponent },
    { path: 'registrer', component: RegistrerComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: LoginComponent }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });