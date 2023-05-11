import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { configurationRoutesBackend } from '../config/configuration.routes.backend';
import { Observable } from 'rxjs';

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
  storeIdentifiedUserData(data: UserModel){
    let cadena = JSON.stringify(data);
    let dataLS = localStorage.getItem("data-user");
    if (dataLS) {
      return false;
    } else {
      localStorage.setItem("data-user", cadena);
      return true;
    }
  }
  
}
