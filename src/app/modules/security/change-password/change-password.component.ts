import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  fGroup: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private router: Router) {}
ngOnInit(){
  this.buildForm
}
  buildForm() {
    this.fGroup = this.fb.group({
      passwordActual: ['', [Validators.required]],
    });
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }
}
