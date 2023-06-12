import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-projector-modal',
  templateUrl: './projector-modal.component.html',
  styleUrls: ['./projector-modal.component.css']
})
export class ProjectorModalComponent {

  @Input()
  title!:string;

  @Input()
  description!:string;

}
