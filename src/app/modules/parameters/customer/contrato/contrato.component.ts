import { Component } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent {
  contractId: string | undefined;

  constructor(private securityService: SecurityService) {}

  showError: boolean = false;
  
  getContract() {
    if (this.contractId) {
      this.securityService.getContrato(this.contractId).subscribe((data: any) => {
        // Lógica para manejar la respuesta del contrato descargado
        console.log(data);
      });
    } else {
      this.showError = true; // Mostrar la notificación de error
          setTimeout(() => {
            this.showError = false; // Ocultar la notificación de error después de 6 segundos
          }, 6000);
      // ID de contrato no ingresado
      console.log('Debe ingresar el ID del contrato');
    }
  }
}
