import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';



export const ValidateInactiveSessionGuard = () => {
  
  const securityService = inject(SecurityService);
  const router = inject(Router);

  let Sesion = securityService.validateSesion();
      if (Sesion) {
        router.navigate(['/home']);
        return false;
      }
      return false;
  
}
