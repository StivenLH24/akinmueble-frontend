import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      typeMessage: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.invalid) {
      alert('debes ingresar todos los campos requeridos')
      return;
    }
    const data = this.contactForm.value;

    this.securityService.enviarDatos(data).subscribe(response => {
      this.router.navigate(["/info/RedirectContact"])
    },
    error => {
      console.log(data)
      console.error('Error:', error);
      console.log('Status:', error.status);
      console.log('Mensaje:', error.statusText);
    }
    );
  }
}
