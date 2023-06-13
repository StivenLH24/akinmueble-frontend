import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Property } from "src/app/models/property.model";
import { Observable } from "rxjs";
import { configurationRoutesBackend } from "src/app/config/configuration.routes.backend";

@Injectable({
  providedIn: "root",
})
export class PropertyService {
  constructor(private http: HttpClient) {}
  urlLogic: string = configurationRoutesBackend.urlLogic;

  getPropertyDetail(propertyId:number): Observable<Property> {
    return this.http.get<Property>(
      `http://localhost:3001/properties/${propertyId}?filter={"fields":["id", "address", "price", "videoSource", "advisorId", "propertyStatusId", "cityId", "offerTypeId", "propertyManagerId", "propertyTypeId"], "include": [{"relation":"advisor"},{"relation":"propertyStatus"},{"relation":"city"}, {"relation":"offerType"}, {"relation":"propertyManager"}, {"relation":"propertyType"}]}`
    );
  }

  getpropertiesByAdvisor(advisorId:number):Observable<Property[]> {
    return this.http
      .get<Property[]>(
        `${this.urlLogic}properties?filter={"include": [ {"relation": "propertyPictures"}]}`
      )
  }
}
