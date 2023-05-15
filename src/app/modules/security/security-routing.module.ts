import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { IdentifyUserComponent } from './identify-user/identify-user.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { VerifyTwofaComponent } from './verify-twofa/verify-twofa.component';

const routes: Routes = [
  {
    path: "identify-user",
    component: IdentifyUserComponent
  },
  {
    path: "change-password",
    component: ChangePasswordComponent
  },
  {
    path : "recover-password",
    component: RecoverPasswordComponent
  },
  {
    path: "sign-out",
    component: SignOutComponent
  },
  {
    path: "register-form",
    component: 	RegisterFormComponent
  },
  {
    path: "2fa",
    component: VerifyTwofaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
