import { AdvisorModel } from "./advisor.model";
import { City } from "./city.model";
import { OfferType } from "./offerType.model";
import { PropertyManager } from "./propertyManager.model";
import { PropertyStatusModel } from "./propertyStatus.model";
import { PropertyType } from "./propertyType.model";
import { PropertyPicture } from "./propertypicture.model";

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
  
  city?: City;
  propertyType?: PropertyType;
  propertyPictures?: PropertyPicture[];
  propertyManager?: PropertyManager;
  advisor?: AdvisorModel;
  propertyStatus?: PropertyStatusModel;
  offerType?: OfferType;
}
