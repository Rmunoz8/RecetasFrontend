import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecetaService } from "../../services/receta.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Receta } from "../../interfaces/receta.interface";
import { AlertsService } from "../../services/alerts.service";
import { IngredienteComponent } from "../../components/ingrediente/ingrediente.component";
import { Usuario } from "../../interfaces/usuario.interfaces";
import { LoginService } from "../../services/login.service";
import { DatePipe } from '@angular/common';
import { SnotifyService } from "ng-snotify";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent implements OnInit {

  pulsado: boolean = false;
  formulario: FormGroup;
  id:string;
  url: string;
  user: Usuario;
  receta:Receta = {
    _id:"",
    nombre:"",
    usuario:"",
    pasos:"",
    dificultad:"sinDificultad",
    img:null,
    ingredientes: [] ,
    creado:null  ,
    nick: ""
  }

  public options: Object;

  constructor(private _recetaService:RecetaService,
              private router:Router,
              private route:ActivatedRoute,
              private _alertService:AlertsService,
              private _loginService:LoginService,
              private _snotifyService: SnotifyService,
              private _uploadService: UploadService
            ) {
    this.user = this._loginService.getDatosUser();
    console.log(this.user);
    // Obtenemos id de la URL
    this.route.params.subscribe( parametros=>{
      this.id = parametros['id']; 
    });
    
    // Creacion del formulario
    this.formulario = new FormGroup({
      imagen: new FormControl("", Validators.required),      
      pasos: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      dificultad: new FormControl("", [Validators.required,
                                  this.dificultadSeleccionada]),      
    });
    console.log("Formulario creado");
    this.options={
      placeholderText: '¡Cuéntanos tu receta!',
        language: 'es',
          // Set the image upload parameter.
          imageUploadParam: 'image',

            // Set the image upload URL.
              imageUploadURL: `http://localhost:3800/api/upImageReceta`,

              // Set request type.
              imageUploadMethod: 'POST',

                // Set max image size to 5MB.
              imageMaxSize: 5 * 1024 * 1024,

                  // Allow to upload PNG and JPG.
              imageAllowedTypes: ['jpeg', 'jpg', 'png'],


              toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo']

    }
   }

  ngOnInit() {

    
  }

  deleteAll(){
    this.receta.ingredientes = [];
  }

  deleteOne(e){
    this.receta.ingredientes.splice(e, 1);

  }

  crearReceta(){     

    if(this.pulsado == false){
      this.pulsado = true;
      this.receta.usuario = this.user._id;
      this.receta.nick = this.user.nick;
      this.receta.creado = this.getFecha();


      console.log(`Receta ->${JSON.stringify(this.receta)} `);


      this._recetaService.neuevaReceta(this.receta).subscribe(datos => {
        if (datos.message) {
          this._snotifyService.error(datos.message, {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false
          });
          this.pulsado = false;
        } else {
          console.log(`RECETA -> ${datos.receta._id} `);

          this._uploadService.makeFileRequest(`http://localhost:3800/api/recetaImage/${datos.receta._id}`, [], this.filesToUpload, 'image', datos.receta._id)
            .then((res: any) => {
              console.log(res);
              this.receta.img = res.Receta.img;
              // localStorage.setItem('userIndentificado', JSON.stringify(this.user));
              this.url = `http://localhost:3800/api/recetaImageFile/${res.Receta.img}`;

            });
          this._snotifyService.success('¡Receta creada!', {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false
          });
          setTimeout(() => {
            this.pulsado = false;
            this.router.navigate(['/listaRecetas']); 
          }, 2000);

        }
      },
        error => {
          console.error(error)
        }
      );

    }


    
  }


  getFecha(){
    let hoy = new Date();
    let dd = hoy.getDate();
    let mm = hoy.getMonth() + 1; //hoy es 0!
    let yyyy = hoy.getFullYear();

    if (dd < 10) {
      dd = Number('0' + dd);
    }

    if (mm < 10) {
      mm = Number('0' + mm);
    }

    let final = new Date(`${mm}/${dd}/${yyyy}`);

    return final;
  }

  // Validaciones propias
  dificultadSeleccionada(control: FormControl): { [s: string]: boolean } {
    if (control.value === "sinDificultad") {
      return {
        dificultadSeleccionada: true
      }
    }
    return null;
  }

  anyadirIngrediente(){
    this.receta.ingredientes.push({
      nombre:'Ingrediente',
      cantidad:'Cantidad'
    });
  }

  public filesToUpload: Array<File>
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  envio(){    
    if(this.formulario.invalid){
      this._snotifyService.error('Faltan datos', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false
      });
    }

  }


}
