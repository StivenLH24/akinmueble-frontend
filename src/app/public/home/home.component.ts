import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { Property } from 'src/app/models/property.model';
import { configurationRoutesBackend } from 'src/app/config/configuration.routes.backend';
import { DataPropertyService } from 'src/app/services/data-property.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { RequestModel } from 'src/app/models/request.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  propiedades: Property[] = [];
  selected = 'option2';
  offerType: string = '';
  propertyType: string = '';
  urlLogic: string = configurationRoutesBackend.urlLogic;
  sesionActive: boolean = false;
  confirmModalTitle: string = '';
  descriptionConfirmModal: string = '';
  peticionRepetida: boolean = false;
  propRep!: number;

  userSolicitante: UserModel = new UserModel();
  newRequest: RequestModel = new RequestModel();

  constructor(
    private dataPropertyService: DataPropertyService,
    private servicioSeguridad: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.servicioSeguridad.obtenerPropiedadesSinFiltros().subscribe((data) => {
      console.log(data);
      this.validateSesion();
      this.propiedades = data;
      this.servicioSeguridad.getIdUserPkValidated();
    });
  }

  responseModal(response: boolean) {
    alert('funciona');
  }
  /*
asumiendo un true en el modal, vamos a seguir con la logica de creacion de la request
*/
  createRequest(property: Property) {
    //primero se llama al responseModal
    this.newRequest.propertyId = property.id;
    this.newRequest.advisorId = property.advisorId;
    this.newRequest.requestTypeId = property.offerTypeId;
    let pk = this.servicioSeguridad.getIdUserPkValidated();
    if (pk) {
      this.newRequest.customerId = parseInt(pk);
    }
    this.servicioSeguridad.createRequest(this.newRequest).subscribe({
      next: (response: RequestModel | null) => {
        //aqui debe notificar que se ha hecho correctamente la solicitud
      },
      error: (error: any) => {
        if (property.id) {
          this.propRep = property.id;
        }
        this.peticionRepetida = true; // Mostrar la notificación de error
        setTimeout(() => {
          this.peticionRepetida = false; // Ocultar la notificación de error después de 6 segundos
        }, 3000);
      },
    });
  }

  validateSesion() {
    this.servicioSeguridad.getDataSesion().subscribe({
      next: (response: any) => {
        if (response.token != '') {
          this.sesionActive = true;
        } else {
          this.sesionActive = false;
        }
      },
      error: (error: any) => {},
    });
  }

  filtrarPropiedades() {
    console.log('presiona boton');
    console.log(this.propertyType);
    console.log(this.offerType);
    
    
    if (this.offerType === '' && this.propertyType === '') {
      alert('Por favor selecciona filtros validos, gracias.');
    }

    if (
      (this.propertyType === '0' || this.propertyType === '') &&
      (this.offerType === '0' || this.offerType === '')
    ) {
      console.log();
      
      this.servicioSeguridad
        .obtenerPropiedadesSinFiltros()
        .subscribe((data) => {
          this.propiedades = data;
        });
      return;
    }
    if (
      (this.offerType === '0' || this.offerType === '') &&
      this.propertyType !== '' &&
      this.propertyType !== '0'
    ) {
      this.servicioSeguridad
        .obtenerPropType(this.propertyType)
        .subscribe((data) => {
          this.propiedades = data;
        });
      return;
    }
    if (
      (this.propertyType === '0' || this.propertyType === '') &&
      this.offerType !== '' &&
      this.offerType !== '0'
    ) {
      this.servicioSeguridad
        .obtenerPropOfer(this.offerType)
        .subscribe((data) => {
          this.propiedades = data;
        });
      return;
    }
    if (
      this.propertyType !== '0' &&
      this.offerType !== '0' &&
      this.offerType !== '' &&
      this.propertyType !== ''
    ) {
      this.servicioSeguridad
        .obtenerPropiedades(this.offerType, this.propertyType)
        .subscribe((data) => {
          this.propiedades = data;
        });
      return;
    }
  }

  getFirstImageUrl(propiedad: Property): string {
    if (propiedad.propertyPictures && propiedad.propertyPictures.length > 0) {
      const firstPicture = propiedad.propertyPictures[0];
      const firstSourcePicture =
        firstPicture && firstPicture.pictureSource
          ? firstPicture.pictureSource
          : '/assets/images/default.png';

      return `${this.urlLogic}downloadFile/1/${firstSourcePicture}`;
    }
    return '/assets/images/default.png';
  }

  buttonSolInfo(propiedad: Property) {
    this.dataPropertyService.setInputValue(propiedad, true);
    this.router.navigate(['/info/contact']);
  }
}
