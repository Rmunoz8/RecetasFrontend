import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";


// Services
import { RecetaService } from './services/receta.service';

// Rutas
import { APP_ROUTING } from "./app.routes";

// Components
import { AppComponent } from './app.component';
import { VistaRecetaComponent } from './components/vista-receta/vista-receta.component';
import { ListaRecetasComponent } from './components/lista-recetas/lista-recetas.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CrearRecetaComponent } from './components/crear-receta/crear-receta.component';


@NgModule({
  declarations: [
    AppComponent,
    VistaRecetaComponent,
    ListaRecetasComponent,
    NavbarComponent,
    CrearRecetaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    RecetaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
