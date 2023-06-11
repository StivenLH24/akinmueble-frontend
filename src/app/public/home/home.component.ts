import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  propiedades: any[] = [];
  selected = 'option2';
  offerType: string = '';
  propertyType: string = '';

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

    if ((this.propertyType === '0' || this.propertyType === '') && (this.offerType === '0' ||this.offerType === '')) {
      console.log('control 1');
      this.servicioSeguridad
        .obtenerPropiedadesSinFiltros()
        .subscribe((data) => {
          console.log(data);
          this.propiedades = data;
        });
      return;
    }
    if ((this.offerType === '0' || this.offerType === '') && (this.propertyType !== '' && this.propertyType !== '0')) {
      console.log('control 2');
console.log('propertytype = ',this.propertyType)
      this.servicioSeguridad
        .obtenerPropType(this.propertyType)
        .subscribe((data) => {
          console.log(data);
          this.propiedades = data;
        });
      return;
    }
    if ((this.propertyType === '0' || this.propertyType === '') && (this.offerType !== '' && this.offerType !== '0')) {
      console.log('control 3');
      console.log('offertype = ',this.offerType)
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
}
