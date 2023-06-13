import { Component } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  rolUsuario: string | null;

  constructor(
    private serviceSecurity: SecurityService
    ){
      this.rolUsuario = this.serviceSecurity.getRolUserValidated();
    }

  sesionActive: boolean = false;

  ngOnInit() {
    this.validateSesion();
  }

  validateSesion() {
    this.serviceSecurity.getDataSesion().subscribe({
      next: (response: any) => {
        if(response.token != "") {
          this.sesionActive = true;
        }else{
          this.sesionActive = false;
        }
      },
      error: (error: any) => {

      }
    })
  }

}
