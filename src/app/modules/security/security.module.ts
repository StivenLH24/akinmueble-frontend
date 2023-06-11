import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { VerifyTwofaComponent } from './verify-twofa/verify-twofa.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { IdentifyUserComponent } from './identify-user/identify-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidateHashUserComponent } from './validate-hash-user/validate-hash-user.component';



@NgModule({
  declarations: [
    IdentifyUserComponent,
    VerifyTwofaComponent,
    RecoverPasswordComponent,
    ChangePasswordComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    ListUserComponent,
    SignOutComponent,
    IdentifyUserComponent,
    ValidateHashUserComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SecurityModule { }
