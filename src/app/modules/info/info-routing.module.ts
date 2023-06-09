import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { RedirectContactComponent } from './redirect-contact/redirect-contact.component';
const routes: Routes = [
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "RedirectContact",
    component: RedirectContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
