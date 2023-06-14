import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisionComponent } from './mision/mision.component';
import { VisionComponent } from './vision/vision.component';
import { AdvisorListComponent } from './advisor/advisor-list/advisor-list.component';
import { RequestsListComponent } from './request/requests-list/requests-list.component';
import { ContratoComponent } from './customer/contrato/contrato.component';
import { ValidateActiveSessionGuard } from 'src/app/guardian/validate-active-session.guard';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { CreatePropertyComponent } from './property/create-property/create-property.component';

const routes: Routes = [
  {
    path: "mision",
    component: MisionComponent,
  },
  {
    path: "vision",
    component: VisionComponent
  },
  {
    path: "advisor/list",
    component: AdvisorListComponent
  },
  {
    path: "request/list",
    component: RequestsListComponent
  },
  {
    path: "advisor/property/list",
    component: PropertyListComponent
  },
  {
    path: "advisor/property/list/create-property",
    component: CreatePropertyComponent
  },
  {
    path: "customer/contrato",
    component: ContratoComponent,
    canActivate: [ValidateActiveSessionGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
