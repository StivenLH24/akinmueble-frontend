import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  fGroup: FormGroup = new FormGroup({});
  showError: boolean = false;
  textError:string='';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private servicioSeguridad: SecurityService
  ) {}

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.fGroup = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
    });
  }

  recuperarClave() {
    if (this.fGroup.invalid) {
      this.textError= "debe ingresar un correo valido";
      this.showError = true; // Mostrar la notificación de error
      // setTimeout(() => {
      //   this.showError = false; // Ocultar la notificación de error después de 6 segundos
      // }, 6000);
    } else {
      let usuario = this.getFormGroup['user'].value;
      this.servicioSeguridad.RecuperarClavePorUsuario(usuario).subscribe({
        next: () => {
          this.router.navigate(["/security/redirect-recovery-password"])
        },
        error: (err) => {
          this.textError= "ha ocurrido un error enviando la contraseña";
          this.showError = true; // Mostrar la notificación de error
          setTimeout(() => {
            this.showError = false; // Ocultar la notificación de error después de 6 segundos
          }, 6000);
        },
      });
    }
  }
  get getFormGroup() {
    return this.fGroup.controls;
  }
}
