import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router, Route } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './../login/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    console.log('Verificando se o usuário tem acesso ao módulo para liberar o download do módulo no browser.')
    return this.verificarAcesso();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.verificarAcesso();
  }

  private verificarAcesso() {
    if (this.authService.usuarioEstaAutenticado()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}