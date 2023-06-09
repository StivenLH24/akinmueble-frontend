import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RedirectContactComponent } from './redirect-contact/redirect-contact.component';


@NgModule({
  declarations: [
    ContactComponent,
    RedirectContactComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    ReactiveFormsModule
  ]
})
export class InfoModule { }
