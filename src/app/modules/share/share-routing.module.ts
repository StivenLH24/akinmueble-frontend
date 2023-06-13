import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathNotFoundComponent } from 'src/app/public/error/path-not-found/path-not-found.component';
import { RedirectTemplateComponent } from './redirect-template/redirect-template.component';

const routes: Routes = [
  {
    path: "redirecttemplate",
    component: RedirectTemplateComponent
  },
  {
    //siempre debe ser la última ruta
    path: "**",
    component: PathNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareRoutingModule { }
