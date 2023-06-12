import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShareRoutingModule } from "./share-routing.module";
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    ConfirmModalComponent,
   
  ],
  imports: [CommonModule, ShareRoutingModule],
  exports: [ConfirmModalComponent],
})
export class ShareModule {}
