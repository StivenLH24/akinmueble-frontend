import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { IdentifyUserComponent } from './identify-user/identify-user.component';

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
    path: "Sign-out",
    component: SignOutComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
