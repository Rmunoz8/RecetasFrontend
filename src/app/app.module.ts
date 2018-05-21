import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";


// Services
import { RecetaService } from './services/receta.service';
import { AlertsService } from "./services/alerts.service";
import { UsuarioService } from "./services/usuario.service";
import { LoginService } from "./services/login.service";

// Rutas
import { APP_ROUTING } from "./app.routes";

// Components
import { AppComponent } from './app.component';
import { VistaRecetaComponent } from './components/vista-receta/vista-receta.component';
import { ListaRecetasComponent } from './components/lista-recetas/lista-recetas.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CrearRecetaComponent } from './components/crear-receta/crear-receta.component';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { LoginComponent } from './components/login/login.component';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    VistaRecetaComponent,
    ListaRecetasComponent,
    NavbarComponent,
    CrearRecetaComponent,
    AlertsComponent,
    ListaUsuariosComponent,
    RegistrerComponent,
    LoginComponent,
    IngredienteComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SnotifyModule
  ],
  providers: [
    RecetaService,
    AlertsService,
    UsuarioService,
    LoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
