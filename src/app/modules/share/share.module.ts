import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShareRoutingModule } from "./share-routing.module";
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ProjectorModalComponent } from './projector-modal/projector-modal.component';


@NgModule({
  declarations: [
    ConfirmModalComponent,
    ProjectorModalComponent
  ],
  imports: [CommonModule, ShareRoutingModule],
  exports: [ConfirmModalComponent, ProjectorModalComponent],
})
export class ShareModule {}
