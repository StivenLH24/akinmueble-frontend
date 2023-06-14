import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chargue-image',
  templateUrl: './chargue-image.component.html',
  styleUrls: ['./chargue-image.component.css']
})
export class ChargueImageComponent {
  cargaArchivoFG:FormGroup;
  archivoCargado:boolean=false;

constructor(

)
{
this.cargaArchivoFG = new FormGroup({
      // address: new FormControl('', Validators.required),
    
    });

   
}




  CuandoSeleccionaArchivo(event:any){

  }

  CargarArchivo(){

  }
}
