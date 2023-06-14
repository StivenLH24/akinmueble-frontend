import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { DeleteCustomerComponent } from './customer/delete-customer/delete-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { ListCustomerComponent } from './customer/list-customer/list-customer.component';
import { MisionComponent } from './mision/mision.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { AdvisorListComponent } from './advisor/advisor-list/advisor-list.component';
import { VisionComponent } from './vision/vision.component';
import { ShareModule } from '../share/share.module';
import { RequestsListComponent } from './request/requests-list/requests-list.component';
import { ContratoComponent } from './customer/contrato/contrato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestDetailComponent } from './request/request-detail/request-detail.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { CreatePropertyComponent } from './property/create-property/create-property.component';
import { MatSelectModule } from '@angular/material/select';
import { CommentaryModalComponent } from './request/commentary-modal/commentary-modal.component';
import { ChargueImageComponent } from './property/chargue-image/chargue-image.component';


@NgModule({
  declarations: [
    DeleteCustomerComponent,
    EditCustomerComponent,
    CreateCustomerComponent,
    ListCustomerComponent,
    ListProductComponent,
    CreateProductComponent,
    DeleteProductComponent,
    EditProductComponent,
    MisionComponent,
    VisionComponent,
    AdvisorListComponent,
    RequestsListComponent,
    ContratoComponent,
    RequestDetailComponent,
    PropertyListComponent,
    CreatePropertyComponent,
    ChargueImageComponent,
    CommentaryModalComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class ParametersModule { }
