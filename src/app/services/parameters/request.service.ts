import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SecurityService } from "../security.service";
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
      'http://localhost:3001//requests_with_filter?filter={"fields":["id",  "creationDate", "closeDate", "propertyId", "requestStatusId","requestTypeId", "customerId", "contractSource"], "include":[{"relation": "requestType", "scope": {"fields":["requestTypeName"]}}, {"relation":"requestStatus"}, {"relation":"property",   "scope": {"include":[{"relation":"propertyPictures"}, {"relation":"propertyType"} ,  {"relation":"city", "scope":{  "include":[ {"relation": "department"}]}}]}}]}'
    );
  }

  downloadContract(contractSource:string): Observable<HttpResponse<Blob>> {
    // return this.http.get<any>(
    //   `http://localhost:3001/downloadFile/2/${contractSource}`
    // );
    const options = {
      responseType: 'blob' as 'json' // Especifica el tipo de respuesta como blob
    };
    return this.http.get(
      `http://localhost:3001/downloadFile/2/1686143480663-5. Contrato prestaciÃ³n de servicios Jhon Eider Cardona.pdf`,
      options
    )as Observable<HttpResponse<Blob>>;
  }
}
