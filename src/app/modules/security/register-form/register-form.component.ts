import { Component } from '@angular/core';
import { FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';

interface Message {
  type: 'success' | 'error';
  content: string;
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  clienteForm: FormGroup;
  asesorForm: FormGroup;
  selectedOption: string = '';
  messages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService
  ) {
    this.clienteForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: [''],
      firstLastName: ['', Validators.required],
      secondLastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      documentNumber: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
    });

    this.asesorForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: [''],
      firtsLastName: ['', Validators.required],
      secondLastName: [''],
      email: ['', [Validators.required, Validators.email]],
      documentNumber: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      dateOfBirth: ['', Validators.required],
    });
  }

  /**
   * Función de registro de cliente
   */
  registerCliente() {
    if (this.clienteForm.valid) {
      const cliente = this.clienteForm.value;
      this.securityService.registerCustomer(cliente).subscribe({
        next: (response: any) => {
          // Lógica de manejo de respuesta exitosa
          this.showMessage('Registro exitoso', 'success');
          console.log(response);
        },
        error: (err: any) => {
          // Lógica de manejo de error
          this.showMessage('Registro fallido', 'error');
          console.log(err);
          console.log(cliente);
        },
      });
    } else {
      // Lógica de manejo de formulario inválido
      this.showMessage('Formulario inválido', 'error');
      console.log(this.clienteForm);
      console.log(this.clienteForm.value);
    }
  }

  /**
   * Función de registro de asesor
   */
  registerAsesor() {
    if (this.asesorForm.valid) {
      const asesor = this.asesorForm.value;
      this.securityService.registerAdvisor(asesor).subscribe({
        next: (response: any) => {
          // Lógica de manejo de respuesta exitosa
          this.showMessage('Registro exitoso', 'success');
          console.log(response);
        },
        error: (err: any) => {
          // Lógica de manejo de error
          this.showMessage('Registro fallido', 'error');
          console.log(err);
          console.log(asesor);
        },
      });
    } else {
      // Lógica de manejo de formulario inválido
      this.showMessage('Formulario inválido', 'error');
      console.log(this.asesorForm);
      console.log(this.asesorForm.value);
    }
  }

  /**
   * Función de registro público
   */
  register() {
    if (this.selectedOption === 'Cliente') {
      this.registerCliente();
    } else if (this.selectedOption === 'Asesor') {
      this.registerAsesor();
    }
  }

  /**
   * Mostrar mensaje en la interfaz
   * @param content Contenido del mensaje
   * @param type Tipo de mensaje (success, error)
   */
  showMessage(content: string, type: 'success' | 'error') {
    this.messages.push({ content, type });
    setTimeout(() => {
      this.removeMessage(this.messages.length - 1);
    }, 3000);
  }

  /*
   * Eliminar mensaje de la interfaz
   * @param index Índice del mensaje a eliminar
   */
  removeMessage(index: number) {
    this.messages.splice(index, 1);
  }
}

