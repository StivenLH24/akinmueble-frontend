import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { Property } from 'src/app/models/property.model';
import { configurationRoutesBackend } from 'src/app/config/configuration.routes.backend';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  propiedades: Property[] = [];
  selected = 'option2';
  offerType: string = '';
  propertyType: string = '';
  urlLogic: string = configurationRoutesBackend.urlLogic;


}
