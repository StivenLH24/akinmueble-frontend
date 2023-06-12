import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { UserModel } from 'src/app/models/user.model';
import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identify-user',
  templateUrl: './identify-user.component.html',
  styleUrls: ['./identify-user.component.css']
})

export class IdentifyUserComponent {
  fGroup: FormGroup = new FormGroup({});
  showPasswordError: boolean = false;
textError:string='';
  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.buildForm();
    console.log(this.fGroup)
  }

  buildForm() {
    this.fGroup = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]]
    });
  }

  showError: boolean = false;

IdentyUser() {
  if (this.fGroup.invalid) {
    alert("Debe ingresar el código");
  } else {
    let user = this.getFormGroup['user'].value;
    let password = this.getFormGroup['password'].value;
    let encryptedPassword = MD5(password).toString();
    this.securityService.identifyUser(user, encryptedPassword).subscribe({
      next: (response: any) => {
        if (response.ok !== true && response.message === "El correo no ha sido validado") {
          this.textError = "Falta validación del correo electrónico. <br/> Por favor ve a tu bandeja de entrada <br/> y haz click en el enlace.";
          this.showError = true; // Mostrar la notificación de error
          setTimeout(() => {
            this.showError = false; // Ocultar la notificación de error después de 6 segundos
          }, 6000);
        } else {
            const data = response.data;
            if (this.securityService.storeIdentifiedUserData(data)) {
              this.router.navigate(["/security/2fa"]);
            }
          }
        },
        error: (err) => {
          this.textError="Credenciales incorrectas. <br/> verifica las credenciales que haz ingresado"
          this.showError = true; // Mostrar la notificación de error
          setTimeout(() => {
            this.showError = false; // Ocultar la notificación de error después de 6 segundos
          }, 6000);
          console.log(err);
        }
      });
    }
  }


  get getFormGroup() {
    return this.fGroup.controls;
  }
}
