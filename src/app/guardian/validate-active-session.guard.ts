import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';


export const ValidateActiveSessionGuard = () => {

  const securityService = inject(SecurityService);
  const router = inject(Router);

  let Sesion = securityService.validateSesion();
      if (Sesion) {
        return true;
      }
      router.navigate(['/home']);
      return false;
  
}
