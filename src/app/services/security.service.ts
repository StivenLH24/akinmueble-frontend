import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { configurationRoutesBackend } from '../config/configuration.routes.backend';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { userValidatedModel } from '../models/user.validated.model';
import { Property } from '../models/property.model';
import { RouteConfigLoadEnd } from '@angular/router';
import { RequestModel } from '../models/request.model';
import { PropertyType } from '../models/propertyType.model';
import { City } from '../models/city.model';
import { OfferType } from '../models/offerType.model';
import { ArchivoModel } from '../models/archivo.model';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  urlBase: string = configurationRoutesBackend.urlSecurity;
  urlLogic: string = configurationRoutesBackend.urlLogic;
  constructor(private http: HttpClient) {
    this.validateSesion();
  }

  /**
   * Identificar usuario
   * @param usuario
   * @param clave
   * @returns datos del usuario validado
   */
  identifyUser(user: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlBase}identify-user`, {
      email: user,
      password: password,
    });
  }

  /**
   * Almacena los datos del usuario
   * @param datos datos del usuario
   */
  storeIdentifiedUserData(data: UserModel): boolean {
    let cadena = JSON.stringify(data);
    let dataLS = localStorage.getItem('data-user');
    let dataValidatedLS = localStorage.getItem('data-user-validated');
    
    if (dataLS && dataValidatedLS) {
      return false;
    } else {
      localStorage.setItem('data-user', cadena);
      return true;
    }
  }

  /**
   * Busca los datos en localstorage de un user
   * @returns
   */
/**
 * This function retrieves stored user data from local storage and returns it as a UserModel object or
 * null.
 * @returns either a UserModel object or null. If there is data stored in the 'data-user' key in the
 * localStorage, it will return a parsed UserModel object. Otherwise, it will return null.
 */
  getStoredIdentifiedUserData(): UserModel | null {
    let dataLS = localStorage.getItem('data-user');
    if (dataLS) {
      return JSON.parse(dataLS);
    } else {
      return null;
    }
  }

  /**
   * validar codigo 2fa
   * @param idusuario
   * @param codigo
   * @returns
   */
  validateCode2FA(
    userId: string,
    code2fa: string
  ): Observable<userValidatedModel> {
    return this.http.post<userValidatedModel>(`${this.urlBase}verify-2fa`, {
      userId: userId,
      code2fa: code2fa,
    });
  }

  /**
   * guarda en local store la informacion del user validado
   * @param data del user validado
   * @returns respuesta
   */
  storeValidatedUserData(data: userValidatedModel): boolean {
    let dataLS = localStorage.getItem('data-user-validated');
    if (dataLS != null) {
      return false;
    } else {
      let dataString = JSON.stringify(data);
      localStorage.setItem('data-user-validated', dataString);
      this.updateBehaviorUser(data);
      return true;
    }
  }

  /**
   * Obtiene el rol del usuario validado almacenado en el localStorage
   * @returns Rol del usuario validado o null si no se encuentra
   */
  getRolUserValidated(): string | null {
    let dataValidatedLS = localStorage.getItem('data-user-validated');
    if (dataValidatedLS) {
      let dataValidated = JSON.parse(dataValidatedLS)
      return dataValidated.user.roleId;
    }
    return null;
  }

  

  RecuperarClavePorUsuario(user: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlBase}recovery-password`, {
      email: user,
    });
  }

  /**
   * administracion de la sesion del user
   */
  dataUserValidated = new BehaviorSubject<userValidatedModel>(
    new userValidatedModel()
  );

  getDataSesion(): Observable<userValidatedModel> {
    return this.dataUserValidated.asObservable();
  }

  validateSesion(): userValidatedModel | null {
    let dataLS = localStorage.getItem('data-user-validated');
    if (dataLS) {
      let obUserValidated = JSON.parse(dataLS);
      this.updateBehaviorUser(obUserValidated);
      return obUserValidated;
    }
    return null;
  }

  updateBehaviorUser(data: userValidatedModel) {
    return this.dataUserValidated.next(data);
  }

  registerCustomer(data: any): Observable<UserModel> {
    return this.http.post<UserModel>(
      `${this.urlLogic}customers-register`,
      data
    );
  }

  registerAdvisor(data: any): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlLogic}advisors-register`, data);
  }

  enviarDatos(data: any): Observable<any> {
    return this.http.post(`${this.urlLogic}send-message-form-contact`, data);
  }

  obtenerPropiedades(offerType: string, propertyType: string) {
    return this.http
      .get<any>(
        `${this.urlLogic}properties?filter={"include": [ {"relation":"propertyPictures"}], "where":{"offerTypeId":"${offerType}", "propertyTypeId":"${propertyType}","propertyStatusId":"1"}}`
      )
      .pipe(map((data) => data as Property[]));
  }
  obtenerPropOfer(offerType: string) {
    return this.http
      .get<any>(
        `${this.urlLogic}properties?filter={"include": [ {"relation":"propertyPictures"}],"where":{"offerTypeId":"${offerType}","propertyStatusId":"1"}}`
      )
      .pipe(map((data) => data as Property[]));
  }

  obtenerPropType(propertyType: string) {
    return this.http
      .get<any>(
        `${this.urlLogic}properties?filter={"include": [ {"relation":"propertyPictures"}],"where":{"propertyTypeId":"${propertyType}","propertyStatusId":"1"}}`
      )
      .pipe(map((data) => data as Property[]));
  }
  obtenerPropiedadesSinFiltros() {
    return this.http
      .get<any>(
        `${this.urlLogic}properties?filter={"include": [ {"relation": "propertyPictures"}],"where":{"propertyStatusId":"1"}}`
      )
      .pipe(map((data) => data as Property[]));
  }
  /**
   * cerrando sesion
   */
  removerDatosUsuarioValidado() {
    let datosUser = localStorage.getItem('data-user');
    let datosUserValidate = localStorage.getItem('data-user-validated');
    if (datosUser) {
      localStorage.removeItem('data-user');
    }
    if (datosUserValidate) {
      localStorage.removeItem('data-user-validated');
    }
    this.updateBehaviorUser(new userValidatedModel());
  }

  getTokenLocalStorage(): string {
    let ls = localStorage.getItem('data-user-validated');
    if (ls) {
      let user: userValidatedModel = JSON.parse(ls);
      return user.token!;
    } else {
      return '';
    }
  }

  validateHashUser(hash: string) {
    return this.http.post<boolean>(`${this.urlBase}validar-hash-user`, {
      codehash: hash,
    });
  }

  getIdUserValidated(): string | null {
    let dataValidatedLS = localStorage.getItem('data-user-validated');
    if (dataValidatedLS) {
      let dataValidated = JSON.parse(dataValidatedLS)
      return dataValidated.user._id;
    }
    return null;
  }

  getIdUserPkValidated(): string | null {
    let dataValidatedLS = localStorage.getItem('data-user-validated');
    if (dataValidatedLS) {
      let dataValidated = JSON.parse(dataValidatedLS)
      
      return dataValidated.user.pk;
    }
    return null;
  }

  getContrato(idcontrato: string): Observable<any> {
    /* http://localhost:3001/customer/1/download-document/4 */
    let idcustomer = this.getIdUserValidated();
    return this.http.get<any>(`${this.urlLogic}customer${idcustomer}download-document/${idcontrato}`);
  }
  
  
  createRequest(newRequest:RequestModel):Observable<RequestModel|null>{
  return this.http.post<RequestModel>((`${this.urlLogic}customers/${newRequest.customerId}/requests`),newRequest)
  }



  getPropertyTypes(): Observable<PropertyType[]> {
    return this.http.get<PropertyType[]>(`${this.urlLogic}property-types`);
  }
  getListCity(): Observable<City[]> {
    return this.http.get<City[]>(`${this.urlLogic}cities`);
  }
  getListOffer(): Observable<OfferType[]> {
    return this.http.get<OfferType[]>(`${this.urlLogic}offer-types`);
  }

  createProperty(data:any, id:string): Observable<any>{
return this.http.post<any>(`${this.urlLogic}advisors/${id}/properties`, data);
  }

 



  CargarArchivo(formData: FormData,id:string): Observable<ArchivoModel> {
    return this.http.post<ArchivoModel>((`${this.urlLogic}property/${id}/upload-property-picture`), formData);
  }
  CargarArchivod(formData: FormData): Observable<ArchivoModel> {
    return this.http.post<ArchivoModel>(`${this.urlLogic}property/4/upload-property-picture`, formData);
  }

}



