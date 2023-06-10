import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisionComponent } from './mision/mision.component';
import { VisionComponent } from './vision/vision.component';
import { AdvisorListComponent } from './advisor-list/advisor-list.component';

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
    path: "list",
    component: AdvisorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
