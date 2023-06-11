import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
// import { SecurityService } from "../security.service";
import { RequestModel } from "src/app/models/request.model";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  // token = "";

  constructor(
    private http: HttpClient // private securityService:SecurityService
  ) {
    // this.token = this.securityService.getTokenLocalStorage();
  }

  listRequests(): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(
      `http://localhost:3001//requests_with_filter?filter=
      {"fields":["id",  "creationDate", "closeDate", "propertyId", 
      "requestStatusId","requestTypeId", "customerId", "contractSource", "advisorId"],
       "include":[{"relation": "requestType", 
       "scope": {"fields":["requestTypeName"]}}, 
       {"relation":"requestStatus"},{"relation":"advisor"}, {"relation":"property",  
       "scope": {"include":[{"relation":"propertyPictures"}, 
       {"relation":"propertyType"} ,  {"relation":"city", 
       "scope":{  "include":[ {"relation": "department"}]}}]}}]}`
    );
  }

  downloadContract(contractSource: string): Observable<Blob> {
    const encodedFileName = encodeURIComponent(contractSource);
    const options = {
      responseType: "blob" as "json", // Especifica el tipo de respuesta como blob
    };
    return this.http.get<Blob>(
      `http://localhost:3001/downloadFile/2/${encodedFileName}`,
      options
    );
  }
}
