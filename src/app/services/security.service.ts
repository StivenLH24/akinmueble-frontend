import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { configurationRoutesBackend } from '../config/configuration.routes.backend';
import { BehaviorSubject, Observable } from 'rxjs';
import { userValidatedModel } from '../models/user.validated.model';

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

  validateSesion() {
    let dataLS = localStorage.getItem('data-user-validated');
    if (dataLS) {
      let obUserValidated = JSON.parse(dataLS);
      this.updateBehaviorUser(obUserValidated);
    }
  }

  updateBehaviorUser(data: userValidatedModel) {
    return this.dataUserValidated.next(data);
  }

  registerCustomer(data: any): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.urlLogic}customers-register`, data);
  }

  registerAdvisor(data: any): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.urlLogic}advisors-register`, data);
  }
  

  enviarDatos(data: any): Observable<any> {
    return this.http.post(`${this.urlLogic}send-message-form-contact`, data);
  }


  /**
   * cerrando sesion
   */
  removerDatosUsuarioValidado(){
    let datosUser =localStorage.getItem("data-user");
    let datosUserValidate =localStorage.getItem("data-user-validated");
    if(datosUser){
      localStorage.removeItem("data-user");
    }
    if(datosUserValidate){
      localStorage.removeItem("data-user-validated");
    }
  this.updateBehaviorUser(new userValidatedModel());
  }

  validateHashUser(hash: string) {
    return this.http.post<boolean>(`${this.urlBase}validar-hash-user`, {
      codehash: hash,
    });
  }
}
