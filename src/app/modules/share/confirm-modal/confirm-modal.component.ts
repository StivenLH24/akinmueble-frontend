import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  @Input()
  title!:string;

  @Input()
  description!:string;

  @Output()
  response = new EventEmitter<boolean>();

  cancel() {
    console.log("")
  }

  accept() {
    console.log("")
  }

  notifyParent(value: boolean){
    this.response.emit(value);
  }
}
