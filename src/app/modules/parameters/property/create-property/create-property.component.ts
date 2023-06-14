import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { City } from 'src/app/models/city.model';
import { OfferType } from 'src/app/models/offerType.model';
import { PropertyType } from 'src/app/models/propertyType.model';
import { MatSelectModule } from '@angular/material/select';
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';
import { DataPropertyService } from 'src/app/services/data-property.service';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent {
  fgroup: FormGroup;
  listadoCity:City[]=[];
  itemCity: City = new City;

listadoOfferType:OfferType[]=[];
itemOfferType:OfferType=new OfferType;

listadoPropertyTypeId:PropertyType[]=[];
itemPropertyType: PropertyType= new PropertyType;

constructor(
  private securityService:SecurityService,
  private router: Router,
  private dataProperty: DataPropertyService,
  ){
    this.fgroup = new FormGroup({
      address: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required),
      offerTypeId: new FormControl('', Validators.required),
      propertyTypeId: new FormControl('', Validators.required),
      advisorId: new FormControl('', Validators.required)
    });
  }

  clearForm(){
    this.fgroup.patchValue({
      advisorId: '',
      address:'',
      price:'',
      offerTypeId:'',
      propertyTypeId:'',
      cityId:''
     
    });
  }

ngOnInit(){
 this.getPropertyTypes();
 this.getCities();
 this.getOfferType();
 this.fgroup.patchValue({
  advisorId: this.securityService.getIdUserPkValidated()
});
}
  onSubmit(){
  console.log('impresion de que entra al enviar el form');
  const data = this.fgroup.value;
const id = this.securityService.getIdUserPkValidated(); 
if (id) {
  
    this.securityService.createProperty(data,id).subscribe(response => {
      console.log('se creo la propiedad correctamente');
      this.dataProperty.setIdProperty(response.id)
      this.clearForm();
      this.router.navigate(['/parameters/chargue-image'])
      // routerLink="./create-property"
      // this.router.navigate(['parameters/property/chargue-img'])

    
      
   
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
  

  

getPropertyTypes(): void {
  this.securityService.getPropertyTypes()
    .subscribe(
      (propertyTypes: PropertyType[]) => {
        console.log('se obtuvieron')
        console.log(propertyTypes);
        this.listadoPropertyTypeId = propertyTypes;
      },
      (error) => {
        console.error('Error al obtener los tipos de propiedad', error);
      }
    );
}
getCities(): void {
  this.securityService.getListCity()
    .subscribe(
      (cities: City[]) => {
        console.log('se obtuvieron las ciudades')
        console.log(cities);
        this.listadoCity = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades', error);
      }
    );
}
getOfferType(): void {
  this.securityService.getListOffer()
    .subscribe(
      (offerTypes: OfferType[]) => {
        console.log('se obtuvieron los tipos de ofertas')
        console.log(offerTypes);
        this.listadoOfferType = offerTypes;
      },
      (error) => {
        console.error('Error al obtener los tipos de ofertas', error);
      }
    );
}
}
