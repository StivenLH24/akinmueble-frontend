import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-commentary-modal',
  templateUrl: './commentary-modal.component.html',
  styleUrls: ['./commentary-modal.component.css']
})
export class CommentaryModalComponent {
  @Input()
  title!:string;

  @Input()
  description!:string;

  @Output()
  response = new EventEmitter<any>();

  commentary:string = "";

  cancel() {
    console.log("")
  }

  accept() {
    console.log("")
  }

  notifyParent(value: boolean){
    this.response.emit({
      confirm:value,
      commentary: this.commentary
    });
  }
}
