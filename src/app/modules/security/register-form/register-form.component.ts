import { Component } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  selectedOption: string = '';
  cliente = { nombre: '', contrasena: '' };
  asesor = { nombre: '', correo: '' };
  
  constructor() {
    this.selectedOption = 'asesor';
  }
}
