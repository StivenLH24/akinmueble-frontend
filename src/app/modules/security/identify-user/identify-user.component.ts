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

  IdentyUser() {
    if (this.fGroup.invalid) {
      alert("Debe ingresar el codigo");
    } else {
      let user = this.getFormGroup['user'].value;
      let password = this.getFormGroup['password'].value;
      let encryptedPassword = MD5(password).toString();
      this.securityService.identifyUser(user, encryptedPassword).subscribe({
        next: (response: any) => {
          if (response.ok !== true) {
            alert("Credenciales incorrectas o falta la validación del correo electrónico.");
          } else {
            const data = response.data;
            if (this.securityService.storeIdentifiedUserData(data)) {
              this.router.navigate(["/security/2fa"]);
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  get getFormGroup() {
    console.log("controls-> ", this.fGroup.controls)
    return this.fGroup.controls;
  }
}
