import { City } from "./city.model";
import { PropertyType } from "./propertyType.model";
import {PropertyPicture } from "./propertypicture.model";

export class Property {
  id?: number;
  address?: string;
  price?: number;
  dataOccupied?: string;
  videoSource?: string;
  advisorId?: number;
  propertyStatusId?: number;
  cityId?: number;
  offerTypeId?: number;
  propertyManagerId?: number;
  propertyTypeId?: number;
  city?:City;
  propertyType?:PropertyType;
  propertyPictures?: PropertyPicture[]; 

}
