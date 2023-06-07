import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisionComponent } from './mision/mision.component';
import { VisionComponent } from './vision/vision.component';

const routes: Routes = [
  {
    path: "mision",
    component: MisionComponent
  },
  {
    path: "vision",
    component: VisionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
