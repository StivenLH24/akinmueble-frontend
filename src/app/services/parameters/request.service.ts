import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { configurationRoutesBackend } from "src/app/config/configuration.routes.backend";
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
  urlLogic: string = configurationRoutesBackend.urlLogic;

  listRequests(): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(
      `http://localhost:3001//requests_with_filter?filter=
      {"fields":["id",  "creationDate", "closeDate", "codeptorDocumentsSource", "propertyId", 
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
      `${this.urlLogic}/downloadFile/2/${encodedFileName}`,
      options
    );
  }

  // downloadCodeptorDocuments(): Observable<Blob> {
    
  // }

  getRequestByAdvisor(advisorId: string): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(
      `${this.urlLogic}advisors/${advisorId}/requests?filter=
        {"fields":["id",  "creationDate", "closeDate", "codeptorDocumentsSource", "propertyId", 
        "requestStatusId","requestTypeId", "customerId", "contractSource", "advisorId"],
         "include":[{"relation": "requestType", 
         "scope": {"fields":["requestTypeName"]}}, 
         {"relation":"requestStatus"},{"relation":"advisor"}, {"relation":"property",  
         "scope": {"include":[{"relation":"propertyPictures"}, 
         {"relation":"propertyType"} ,  {"relation":"city", 
         "scope":{  "include":[ {"relation": "department"}]}}]}}]}`
    );
  }

  getRequestByCustomer(customerId: string): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(
      `${this.urlLogic}customers/${customerId}/requests_with_filter?filter=
        {"fields":["id",  "creationDate", "closeDate", "codeptorDocumentsSource", "propertyId",
        "requestStatusId","requestTypeId", "customerId", "contractSource", "advisorId"],
         "include":[{"relation": "requestType", 
         "scope": {"fields":["requestTypeName"]}}, 
         {"relation":"requestStatus"},{"relation":"advisor"}, {"relation":"property",  
         "scope": {"include":[{"relation":"propertyPictures"}, 
         {"relation":"propertyType"} ,  {"relation":"city", 
         "scope":{  "include":[ {"relation": "department"}]}}]}}]}`
    );
  }

  changeStatus(
    advisorId: string,
    requestId: number,
    newStatusId: number,
    commentary: string = "-"
  ): Observable<RequestModel> {
    return this.http.patch<RequestModel>(
      `${this.urlLogic}advisors/${advisorId}/requests/${requestId}/change-status/${newStatusId}`,
      {
        commentary: commentary,
      }
    );
  }
}
