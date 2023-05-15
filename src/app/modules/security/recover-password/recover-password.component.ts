import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
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
      alert('debe ingresar un correo valido');
    } else {
      let usuario = this.getFormGroup['user'].value;
      this.servicioSeguridad.RecuperarClavePorUsuario(usuario).subscribe({
        next: (data) => {
          alert('se ha enviado una nueva contraseña a su metodo de contacto');
        },
        error: (err) => {
          alert('ha ocurrido un error enviando la contraseña');
        },
      });
    }
  }
  get getFormGroup() {
    return this.fGroup.controls;
  }
}
