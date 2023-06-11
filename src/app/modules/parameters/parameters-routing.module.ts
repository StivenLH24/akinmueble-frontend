import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisionComponent } from './mision/mision.component';
import { VisionComponent } from './vision/vision.component';
import { AdvisorListComponent } from './advisor/advisor-list/advisor-list.component';
import { RequestsListComponent } from './request/requests-list/requests-list.component';

const routes: Routes = [
  {
    path: "mision",
    component: MisionComponent
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
