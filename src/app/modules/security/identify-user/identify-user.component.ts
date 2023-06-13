import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';

import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';

declare const grecaptcha: any; // Declara la variable grecaptcha

@Component({
  selector: 'app-identify-user',
  templateUrl: './identify-user.component.html',
  styleUrls: ['./identify-user.component.css']
})

export class IdentifyUserComponent {
 

[x: string]: any;
  fGroup: FormGroup = new FormGroup({});
  showPasswordError: boolean = false;
textError:string='';
bandera:boolean=false;
  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.buildForm();
    this.verificarCaptcha()

  }



   verificarCaptcha() {
    console.log('iniciacion del componente')
    var response = grecaptcha.getResponse();
console.log(response)

if (response) {

  this.bandera=true
  
}
    // Envía el valor de response al servidor para verificarlo

    // Ejemplo de solicitud AJAX utilizando jQuery
    $.ajax({
      type: "POST",
      url: "verificar_captcha.php", // Ruta al archivo en el servidor que verifica el reCAPTCHA
      data: { response: response },
      success: function(result) {
        console.log(result); // Imprime la respuesta en la consola del navegador
        // Realiza las acciones adicionales según el resultado obtenido
      },
      error: function() {
        console.log("Error al verificar el reCAPTCHA");
      }
    });
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
        }
      });
    }
  }


  get getFormGroup() {
    return this.fGroup.controls;
  }
}
