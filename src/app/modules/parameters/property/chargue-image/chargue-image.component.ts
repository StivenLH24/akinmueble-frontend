import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataPropertyService } from 'src/app/services/data-property.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-chargue-image',
  templateUrl: './chargue-image.component.html',
  styleUrls: ['./chargue-image.component.css'],
})
export class ChargueImageComponent {
  cargaArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: boolean = false;
  nombreArchivoCargado: String = '';
  obtenerFgDatos: any;
  urlLogic: string = '';
  idProperty: string = '';
  formData: FormData = new FormData();

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private dataProperty: DataPropertyService
  ) {
    this.cargaArchivoFG = this.fb.group({
      archivo: ['', []],
    });
  }
  ngOnInit(): void {
    this.urlLogic = this.securityService.urlLogic;

    this.dataProperty.getIdProperty().subscribe((value) => {
      console.log(value);
      this.idProperty = value;
    });
  }
  ngOnDestroy() {}

  get obtenerFgArchivo() {
    return this.cargaArchivoFG.controls;
  }

  CuandoSeleccionaArchivo(event: any) {
    console.log('ejecuta');
    if (event.target.files.length > 0) {
      const f: File = event.target.files[0];
      console.log(f);
      this.formData.append('file', f, f.name);
    }
  }

  confirmar (){
    this.securityService
        .CargarArchivo(this.formData, this.idProperty)
        .subscribe({
          next: (data) => {
            this.nombreArchivoCargado = data.file;
            console.log(this.nombreArchivoCargado);
            this.archivoCargado = true;
          },
          error: (error) => {
            alert('No se ha podido cargar la imagen');
          },
        });
  }

  
}
