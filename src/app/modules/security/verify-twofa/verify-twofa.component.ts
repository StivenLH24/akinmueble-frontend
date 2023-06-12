import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService} from 'src/app/services/security.service';
import { Router } from '@angular/router';
import { userValidatedModel } from 'src/app/models/user.validated.model';


@Component({
  selector: 'app-verify-twofa',
  templateUrl: './verify-twofa.component.html',
  styleUrls: ['./verify-twofa.component.css']
})
export class VerifyTwofaComponent {
  
  fGroup: FormGroup = new FormGroup({});
  userId: string = "";
  showError: boolean = false;

  constructor(
    private securityService: SecurityService,
    private fb: FormBuilder,
    private router : Router
    ) {
    /* this.userid = this.securityService.getStoredIdentifiedUserData()?._id || ""; */
  }

  ngOnInit() {
    let data = this.securityService.getStoredIdentifiedUserData();
    if (data != null) {
      this.userId = data._id!;
      this.buildForm();
    }else{
      this.router.navigate(['/security/identify-user']);
    }
  }

  buildForm() {
    this.fGroup = this.fb.group({
      code: ['', [Validators.required]]
    });
  }

  ValidateCod2fa() {
    if(this.fGroup.invalid){
      alert("Debe ingresar el código de verificación");
    } else {
      let code2fa = this.getFormGroup['code'].value;
      console.log(code2fa, this.userId);      
      this.securityService.validateCode2FA(this.userId, code2fa).subscribe({
        next: (response: any) => {
          console.log(response);
          if(response.ok) {
            const userData = response.data;
            this.securityService.storeValidatedUserData(userData);
            console.log("Validación del código 2fa exitosa");
            this.router.navigate(['']);
            
            
          } else {
            console.log(response);
            this.showError = true; // Mostrar la notificación de error
          setTimeout(() => {
            this.showError = false; // Ocultar la notificación de error después de 6 segundos
          }, 6000);
            console.log("Error en la validación del código 2fa");
            console.log(response.ok);
            
            //console.log(response.message);
            // manejar el caso de que la validación no haya sido exitosa
          }
        },
        error: (err) => {
          this.showError = true; // Mostrar la notificación de error
          setTimeout(() => {
            this.showError = false; // Ocultar la notificación de error después de 6 segundos
          }, 6000);
          console.log(err);
          //manejar el caso de que haya ocurrido un error en la petición
        },
      })
    }
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }

}
