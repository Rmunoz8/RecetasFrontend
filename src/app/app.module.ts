import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
// Complementos
import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// Services
import { RecetaService } from './services/receta.service';
import { UsuarioService } from "./services/usuario.service";
import { LoginService } from "./services/login.service";
import { UploadService } from "./services/upload.service";

// Rutas
import { APP_ROUTING } from "./app.routes";

// Components
import { AppComponent } from './app.component';
import { VistaRecetaComponent } from './components/vista-receta/vista-receta.component';
import { ListaRecetasComponent } from './components/lista-recetas/lista-recetas.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CrearRecetaComponent } from './components/crear-receta/crear-receta.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BtnSeguirComponent } from './components/btn-seguir/btn-seguir.component';
import { RecetasUsuarioComponent } from './components/recetas-usuario/recetas-usuario.component';
import { MinUsuarioComponent } from './components/min-usuario/min-usuario.component';
import { ErrorComponent } from './components/error/error.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    VistaRecetaComponent,
    ListaRecetasComponent,
    NavbarComponent,
    CrearRecetaComponent,
    ListaUsuariosComponent,
    RegistrerComponent,
    LoginComponent,
    PerfilComponent,
    BtnSeguirComponent,
    RecetasUsuarioComponent,
    MinUsuarioComponent,
    ErrorComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SnotifyModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    RecetaService,
    UsuarioService,
    LoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
