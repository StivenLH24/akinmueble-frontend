import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { IdentifyUserComponent } from './identify-user/identify-user.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { VerifyTwofaComponent } from './verify-twofa/verify-twofa.component';
import { ValidateHashUserComponent } from './validate-hash-user/validate-hash-user.component';
import { ValidateActiveSessionGuard } from 'src/app/guardian/validate-active-session.guard';
import { ValidateInactiveSessionGuard } from 'src/app/guardian/validate-inactive-session.guard';

const routes: Routes = [
  {
    path: "identify-user",
    component: IdentifyUserComponent,
    canActivate: [ValidateInactiveSessionGuard]
  },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    canActivate: [ValidateActiveSessionGuard]
  },
  {
    path : "recover-password",
    component: RecoverPasswordComponent,
    canActivate: [ValidateInactiveSessionGuard]
  },
  {
    path: "sign-out",
    component: SignOutComponent,
    canActivate: [ValidateActiveSessionGuard]
  },
  {
    path: "register-form",
    component: 	RegisterFormComponent,
    canActivate: [ValidateInactiveSessionGuard]
  },
  {
    path: "2fa",
    component: VerifyTwofaComponent,
    canActivate: [ValidateInactiveSessionGuard]
  },
  {
    path: "validar-hash-user/:hash",
    component: ValidateHashUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
