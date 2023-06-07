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
import { VisionComponent } from './vision/vision.component';


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
    VisionComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
