import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Property } from 'src/app/models/property.model';
import { DataPropertyService } from 'src/app/services/data-property.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  inputPropiedad: Property = new Property;
banderaInteres: boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router,
    private dataPropertyService:DataPropertyService
  ) { }

  ngOnInit() {
    this.getProp();
    this.initializeForm();
    if (this.banderaInteres) { 
    }
  }
  ngOnDestroy(){
    this.dataPropertyService.setDefault();
  }
  getProp(){
    this.dataPropertyService.getInputValueObservable().subscribe(value => {
      this.inputPropiedad= value;
    });
    this.dataPropertyService.getInteresBanderaObservable().subscribe(value => {
      this.banderaInteres = value;
    });
  }
  initializeForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      typeMessage: ['']
    });
  }

  submitForm() {
    if (this.banderaInteres) {
      this.contactForm.patchValue({
        typeMessage: `Interés en la propiedad, con id: ${this.inputPropiedad.id}`
      });
    }

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
