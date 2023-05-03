import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { UserIdentificationComponent } from './user-identification/user-identification.component';
import { VerifyTwofaComponent } from './verify-twofa/verify-twofa.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';


@NgModule({
  declarations: [
    UserIdentificationComponent,
    VerifyTwofaComponent,
    RecoverPasswordComponent,
    ChangePasswordComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
