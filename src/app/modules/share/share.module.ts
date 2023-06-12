import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShareRoutingModule } from "./share-routing.module";
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { RedirectTemplateComponent } from './redirect-template/redirect-template.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    RedirectTemplateComponent
  ],
  imports: [CommonModule, ShareRoutingModule],
  exports: [ConfirmModalComponent],
})
export class ShareModule {}
