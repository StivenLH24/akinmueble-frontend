import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { Property } from 'src/app/models/property.model';
import { configurationRoutesBackend } from 'src/app/config/configuration.routes.backend';

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

  Ventas() {
    alert('Ventas');
  }

  constructor(private servicioSeguridad: SecurityService) {}

  ngOnInit() {
    this.servicioSeguridad.obtenerPropiedadesSinFiltros().subscribe((data) => {
      console.log(data);
      this.propiedades = data;
    });

    console.log('prueba de arranque');
  }

  filtrarPropiedades() {
    console.log('offertype value ', this.offerType);
    console.log('propertytype value', this.propertyType);

    if (this.offerType === '' && this.propertyType === '') {
      alert('Por favor selecciona filtros validos, gracias.');
    }

    if (
      (this.propertyType === '0' || this.propertyType === '') &&
      (this.offerType === '0' || this.offerType === '')
    ) {
      console.log('control 1');
      this.servicioSeguridad
        .obtenerPropiedadesSinFiltros()
        .subscribe((data) => {
          console.log(data);
          this.propiedades = data;
        });
      return;
    }
    if (
      (this.offerType === '0' || this.offerType === '') &&
      this.propertyType !== '' &&
      this.propertyType !== '0'
    ) {
      console.log('control 2');
      console.log('propertytype = ', this.propertyType);
      this.servicioSeguridad
        .obtenerPropType(this.propertyType)
        .subscribe((data) => {
          console.log(data);
          this.propiedades = data;
        });
      return;
    }
    if (
      (this.propertyType === '0' || this.propertyType === '') &&
      this.offerType !== '' &&
      this.offerType !== '0'
    ) {
      console.log('control 3');
      console.log('offertype = ', this.offerType);
      this.servicioSeguridad
        .obtenerPropOfer(this.offerType)
        .subscribe((data) => {
          console.log(data);
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
      console.log('control 4');
      this.servicioSeguridad
        .obtenerPropiedades(this.offerType, this.propertyType)
        .subscribe((data) => {
          console.log(data);
          this.propiedades = data;
        });
      return;
    }
  }

  getFirstImageUrl(propiedad: Property): string {
    console.log(propiedad.propertyPictures);
    console.log(propiedad.propertyPictures?.length);
    if (propiedad.propertyPictures && propiedad.propertyPictures.length > 0) {
      console.log('ingresa a la condicion de tener foto ', propiedad.id);
      const firstPicture = propiedad.propertyPictures[0];
      const firstSourcePicture =
        firstPicture && firstPicture.pictureSource
          ? firstPicture.pictureSource
          : '/assets/images/default.png';

      return `${this.urlLogic}downloadFile/1/${firstSourcePicture}`;
    }
    return '/assets/images/default.png';
  }
}
