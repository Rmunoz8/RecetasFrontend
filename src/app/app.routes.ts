import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListaRecetasComponent } from "./components/lista-recetas/lista-recetas.component";
import { VistaRecetaComponent } from './components/vista-receta/vista-receta.component';
import { CrearRecetaComponent } from "./components/crear-receta/crear-receta.component";

const APP_ROUTES: Routes = [
    
    { path: 'listaRecetas', component: ListaRecetasComponent },
    { path: 'receta/:id', component: VistaRecetaComponent },
    { path: 'crearReceta', component: CrearRecetaComponent },
    { path: '**', component: ListaRecetasComponent },

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });