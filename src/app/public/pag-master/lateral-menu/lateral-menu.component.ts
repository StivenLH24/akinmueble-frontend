import { Component } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css'],
})
export class LateralMenuComponent {
  rolUsuario: string | null;

  constructor(private securityService: SecurityService) {
    this.rolUsuario = this.securityService.getRolUserValidated();
  }
}
