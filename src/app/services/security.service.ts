import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { configurationRoutesBackend } from '../config/configuration.routes.backend';
import { Observable } from 'rxjs';
import { userValidatedModel } from '../models/user.validated.model';

@Injectable({
  providedIn: 'root'
})


export class SecurityService {

  urlBase: string = configurationRoutesBackend.urlSecurity;
  constructor(private http: HttpClient) { }

  /**
   * Identificar usuario
   * @param usuario 
   * @param clave 
   * @returns datos del usuario validado
   */
  identifyUser(user: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlBase}identify-user`, {
      email: user,
      password: password
    });
  }

  /**
   * Almacena los datos del usuario
   * @param datos datos del usuario
   */
  storeIdentifiedUserData(data: UserModel): boolean{
    let cadena = JSON.stringify(data);
    let dataLS = localStorage.getItem("data-user");
    if (dataLS) {
      return false;
    } else {
      localStorage.setItem("data-user", cadena);
      return true;
    }
  }

  /**
   * Busca los datos en localstorage de un user
   * @returns 
   */
  getStoredIdentifiedUserData(): UserModel | null{
    let dataLS = localStorage.getItem("data-user");
    if (dataLS) {
      return JSON.parse(dataLS);
    }else {
      return null;
    }
  }

  /**
   * validar codigo 2fa
   * @param idusuario 
   * @param codigo
   * @returns 
   */
  validateCode2FA(userId: string, code2fa: string): Observable<userValidatedModel> {
    return this.http.post<userValidatedModel>(`${this.urlBase}verify-2fa`, {
      userId: userId,
      code2fa: code2fa
    });
  }

  /**
   * guarda en local store la informacion del user validado
   * @param data del user validado
   * @returns respuesta
   */
  storeValidatedUserData(data: userValidatedModel): boolean{
    let dataLS = localStorage.getItem("data-user-validated");
    if (dataLS != null) {
      return false;
    }else{
      let dataString = JSON.stringify(data);
      localStorage.setItem("data-user-validated", dataString);
      return true;
    }
  }
  
}
